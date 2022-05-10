const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  router.get("/", (req, res) => {
    pool.query(`SELECT orders.id, customers.name, orders.created_at, orders.active, sum(batteries.cost * battery_orders.quantity) as total
                FROM orders
                JOIN customers ON customers.id = customer_id
                JOIN battery_orders ON orders.id = order_id
                JOIN batteries ON batteries.id = battery_id
                GROUP BY orders.id, customers.name, orders.created_at, orders.active
                ORDER BY orders.id;`)
      .then(data => {
        const activeOrders = {};
        for (const order of data.rows) {
          activeOrders[order.id] = order;
        }
        const templateVars = { activeOrders };
        res.render("admin", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

