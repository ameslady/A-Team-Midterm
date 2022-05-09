const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // Pulls a specific customers order details and display on order #id page
  router.get("/", (req, res) => {
    pool.query(`SELECT orders.id,
                    battery_orders.battery_id,
                    batteries.name,
                    battery_orders.quantity,
                    batteries.cost as price,
                    orders.created_at,
                    orders.active,
                    sum(batteries.cost * battery_orders.quantity) as total,
                    sum(batteries.prep_time) as total_prep
                FROM orders
                JOIN battery_orders ON orders.id = order_id
                JOIN batteries ON batteries.id = battery_id
                WHERE battery_orders.order_id = 1
                GROUP BY orders.id, battery_orders.battery_id, batteries.name, battery_orders.quantity, batteries.cost, orders.created_at, orders.active
                ORDER BY orders.id;`)
      .then(data => {
        const customerOrder = {};
        for (const item of data.rows) {
          customerOrder[item.battery_id] = item;
        }
        console.log("🚀 ~ file: admin.js ~ line 18 ~ router.get ~ customerOrders", customerOrder);
        const templateVars = { customerOrder };
        res.render("orders", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    // router.post("/", (req, res) => {
    //   pool.query(';')
    //     .then(() => {

    //     })
    //     .catch(() => {

    //     });
    // });
  });



  // router.get("/", (req, res) => {
  //   const outerQuery = pool.query(`SELECT orders.id,
  //                   battery_orders.battery_id,
  //                   batteries.name,
  //                   battery_orders.quantity,
  //                   batteries.cost as price,
  //                   orders.created_at,
  //                   orders.active,
  //                   sum(batteries.cost * battery_orders.quantity) as total,
  //                   sum(batteries.prep_time) as total_prep
  //               FROM orders
  //               JOIN battery_orders ON orders.id = order_id
  //               JOIN batteries ON batteries.id = battery_id
  //               WHERE battery_orders.order_id = 1
  //               GROUP BY orders.id, battery_orders.battery_id, batteries.name, battery_orders.quantity, batteries.cost, orders.created_at, orders.active
  //               ORDER BY orders.id;`);
  //     const otherQuery = '...';
  //     Promise.all([outerQuery, otherQuery])
  //     .then([data1, data2] => {
  //       const customerOrder = {};
  //       for (const item of data.rows) {
  //         customerOrder[item.battery_id] = item;
  //       }
  //       console.log("🚀 ~ file: admin.js ~ line 18 ~ router.get ~ customerOrders", customerOrder);
  //       const templateVars = { customerOrder };
  //       res.render("orders", templateVars);
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });



  return router;
};
