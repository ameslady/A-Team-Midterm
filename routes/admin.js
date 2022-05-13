const express = require('express');
const router = express.Router();

module.exports = (pool, client) => {
  // display all active orders from DB
  router.get("/", (req, res) => {
    const activeOrdersQuery =
    pool.query(`SELECT orders.id, customers.name, orders.created_at, orders.active, sum(batteries.prep_time) as total_prep, sum(batteries.cost * battery_orders.quantity) as total
    FROM orders
    JOIN customers ON customers.id = customer_id
    JOIN battery_orders ON orders.id = order_id
    JOIN batteries ON batteries.id = battery_id
    WHERE active = true
    GROUP BY orders.id, customers.name, orders.created_at, orders.active
    ORDER BY orders.id;`);

    const completeOrdersQuery =
    pool.query(`SELECT orders.id, customers.name, orders.created_at, orders.active, sum(batteries.prep_time) as total_prep, sum(batteries.cost * battery_orders.quantity) as total
    FROM orders
    JOIN customers ON customers.id = customer_id
    JOIN battery_orders ON orders.id = order_id
    JOIN batteries ON batteries.id = battery_id
    WHERE active = false
    GROUP BY orders.id, customers.name, orders.created_at, orders.active
    ORDER BY orders.id;`);

    Promise.all([activeOrdersQuery, completeOrdersQuery])
      .then(data => {
        const activeOrders = {};
        const completeOrders = {};

        for (const order of data[0].rows) {
          activeOrders[order.id] = order;
        }
        for (const order of data[1].rows) {
          completeOrders[order.id] = order;
        }

        const templateVars = { activeOrders, completeOrders };
        res.render("admin", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // updates an orders active status to false in DB
  router.post("/:id", (req, res) => {
    const updateOrderQuery = pool.query(`UPDATE orders SET active = false WHERE id = ${req.params.id} RETURNING *;`);
    const customerNameQuery = pool.query(`SELECT customers.name, customers.phone_number
    FROM orders
    JOIN customers ON customers.id = customer_id
    WHERE orders.id = ${req.params.id};`);

    Promise.all([updateOrderQuery, customerNameQuery])
      .then(data => {

        const customerName = data[1].rows[0].name;
        const customerPhone = data[1].rows[0].phone_number;

        res.redirect("/admin");

        //sends a text to the customer when order is ready for pick up
        client.messages
          .create({
            body: `Hi ${customerName}! Your order #${req.params.id} is ready for pick-up.`,
            to: `+1${customerPhone}`, // Text this number
            from: '+12073062186', // From a valid Twilio number
          })
          .then((message) => console.log('Twilio Text sent:', message.sid));

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // updates an orders preptime and notifys customer
  router.post("/:id/update", (req, res) => {
    const customerNameQuery = `SELECT customers.name, customers.phone_number
    FROM orders
    JOIN customers ON customers.id = customer_id
    WHERE orders.id = ${req.params.id};`;

    pool.query(customerNameQuery)
      .then(data => {
        const customerName = data.rows[0].name;
        const customerPhone = data.rows[0].phone_number;
        const newPrepTime = req.body.prepTime;

        // sends a text to the customer when order is ready for pick up
        client.messages
        .create({
          body: `Hey ${customerName}! Your order #${req.params.id} is taking a little longer to prepare. It will be ready in ${newPrepTime} mins.`,
          to: `+1${customerPhone}`, // Text this number
          from: '+12073062186', // From a valid Twilio number
        })
        .then((message) => console.log('Twilio Text sent:', message.sid));

        res.redirect("/admin");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

