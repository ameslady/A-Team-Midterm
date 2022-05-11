const express = require('express');
const router = express.Router();

module.exports = (pool, client) => {
  // Pulls a specific customers order details and display on order #id page
  router.get("/:id", (req, res) => {
    const orderSession = req.session.order_id;

    // checks for valid session
    if (!orderSession || orderSession !== Number(req.params.id)) {
      return res.status(400).send("Unauthorized access!");
    };

    const orderDetails =
      pool.query(`SELECT orders.id, orders.created_at, sum(batteries.prep_time) as total_prep, sum(batteries.cost * battery_orders.quantity) as total, orders.active
    FROM orders
    JOIN battery_orders ON orders.id = order_id
    JOIN batteries ON batteries.id = battery_id
    WHERE orders.id = ${req.params.id}
    GROUP BY orders.id, orders.created_at, orders.active
    ORDER BY orders.id;`);

    const orderItems =
      pool.query(`SELECT batteries.id, batteries.name, battery_orders.quantity, batteries.cost as price
    FROM batteries
    JOIN battery_orders ON batteries.id = battery_id
    WHERE battery_orders.order_id = ${req.params.id};`);

    Promise.all([orderDetails, orderItems])
      .then(data => {
        const orderDetails = {};
        const orderItems = {};

        for (const order of data[0].rows) {
          orderDetails[order.id] = order;
        }
        for (const item of data[1].rows) {
          orderItems[item.id] = item;
        }

        const templateVars = { orderSession, orderDetails, orderItems };
        res.render("orders", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {

    const addCustomerQuery = `INSERT INTO customers (name, phone_number) VALUES ($1, $2) RETURNING *;`;
    const createOrderQuery = `INSERT INTO orders (customer_id) VALUES ($1) RETURNING *;`;
    const matchBatteryOrder = `INSERT INTO battery_orders (battery_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *;`;

    const batteries = {
      1: { id: req.body.smallBattery, quantity: req.body.quantity_sm },
      2: { id: req.body.medBattery, quantity: req.body.quantity_med },
      3: { id: req.body.lgBattery, quantity: req.body.quantity_lg },
    };
    // removes items that weren't selected
    for (const key in batteries) {
      if (!batteries[key].id) {
        delete batteries[key];
      }
    }

    console.log("🦋 ~ batteries keys", Object.keys(batteries).length);

    if (!req.body.name || !req.body.phone || Object.keys(batteries).length === 0) { return res.status(403).send("Name, phone, or item selection are not valid!"); };

    pool.query(addCustomerQuery, [`${req.body.name}`, `${req.body.phone}`])
      // adds the new customers to db
      .then(newCustomer => {
        return newCustomer.rows[0].id; //return new customer id
      })
      // creates a new order using the customers id
      .then(newCustomerID => {
        return pool.query(createOrderQuery, [newCustomerID]); //returns new order entry
      })
      // links the batteries and quantity to the new order
      .then(newOrder => {
        for (const battery in batteries) {
          pool.query(matchBatteryOrder, [`${batteries[battery].id}`, `${newOrder.rows[0].id}`, `${batteries[battery].quantity}`]);
        }
        req.session.order_id = newOrder.rows[0].id; // saves order id as a session cookie
        res.redirect(`/orders/${newOrder.rows[0].id}`);

        // sends a text to the customer
        client.messages
          .create({
            body: `Hi ${req.body.name}! Thanks for your order. Your order number is #${newOrder.rows[0].id}.`,
            to: `+1${req.body.phone}`, // Text this number
            from: '+12073062186', // From a valid Twilio number
          })
          .then((message) => console.log('Twilio Text sent:', message.sid));

      })
      .catch(err => {
        res.status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
