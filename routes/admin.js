const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  //display all active orders from DB
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
    const updateOrderQuery = `UPDATE orders SET active = false WHERE id = $1 RETURNING *;`

    pool.query(updateOrderQuery, [req.params.id])
      .then(data => {
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

