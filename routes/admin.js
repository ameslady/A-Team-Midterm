const express = require('express');
const router = express.Router();
const twilio = require('twilio');


// twilio -- this isn't needed in order.js but this file requires it???
const accountSid = 'ACc2e56c63ce1e2c689399e954d3517c86'; // Your Account SID from www.twilio.com/console
const authToken = 'c40081ba0a91b2686b1d917587706f1e'; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);


module.exports = (pool) => {
  // display all active orders from DB
  router.get("/", (req, res) => {
    const orderSession = req.params.id;

    const activeOrdersQuery =
    pool.query(`SELECT orders.id, customers.name, orders.created_at, orders.active, sum(batteries.cost * battery_orders.quantity) as total
    FROM orders
    JOIN customers ON customers.id = customer_id
    JOIN battery_orders ON orders.id = order_id
    JOIN batteries ON batteries.id = battery_id
    WHERE active = true
    GROUP BY orders.id, customers.name, orders.created_at, orders.active
    ORDER BY orders.id;`);

    const completeOrdersQuery =
    pool.query(`SELECT orders.id, customers.name, orders.created_at, orders.active, sum(batteries.cost * battery_orders.quantity) as total
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
        // pass orderSession to templatevars, might not need
        const templateVars = { activeOrders, completeOrders, orderSession };
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

        // sends a text to the customer when order is ready for pick up
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

  return router;
};

