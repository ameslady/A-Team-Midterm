const express = require('express');
const router = express.Router();


module.exports = (pool) => {
  // Pulls a specific customers order details and display on order #id page
  router.get("/:id", (req, res) => {
    const orderSession = req.params.id;
    const orderDetails = pool.query(`SELECT orders.id, orders.created_at, sum(batteries.prep_time) as total_prep, sum(batteries.cost * battery_orders.quantity) as total, orders.active
                                    FROM orders
                                    JOIN battery_orders ON orders.id = order_id
                                    JOIN batteries ON batteries.id = battery_id
                                    WHERE orders.id = ${req.params.id}
                                    GROUP BY orders.id, orders.created_at, orders.active
                                    ORDER BY orders.id;`);
    const orderItems = pool.query(`SELECT batteries.id, batteries.name, battery_orders.quantity, batteries.cost as price
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
    // queries
    const addCustomerQuery = `INSERT INTO customers (name, phone_number) VALUES ($1, $2) RETURNING *;`;
    const createOrderQuery = `INSERT INTO orders (customer_id) VALUES ($1) RETURNING *;`;
    const matchBatteryOrder = `INSERT INTO battery_orders (battery_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *;`;
    const batteries = {
      1: { id: req.body.smallBattery, quantity: req.body.quantity_sm },
      2: { id: req.body.medBattery, quantity: req.body.quantity_med },
      3: { id: req.body.lgBattery, quantity: req.body.quantity_lg },
    };

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
        // saved order id as a session cookie
        req.session.order_id = newOrder.rows[0].id;
        res.redirect(`/orders/${newOrder.rows[0].id}`);
        // res.redirect(`/orders/${newOrder.rows[0].id}`); --> for redirecting l8tr
      })
      .catch(err => {
        res.status(500)
        .json({ error: err.message });
      });
  });


  return router;
};
