const express = require('express');
const router = express.Router();


module.exports = (pool) => {
  // Pulls a specific customers order details and display on order #id page
  router.get("/", (req, res) => {
    const orderDetails = pool.query(`SELECT orders.id, orders.created_at, sum(batteries.prep_time) as total_prep, sum(batteries.cost * battery_orders.quantity) as total, orders.active
                                    FROM orders
                                    JOIN battery_orders ON orders.id = order_id
                                    JOIN batteries ON batteries.id = battery_id
                                    GROUP BY orders.id, orders.created_at, orders.active
                                    ORDER BY orders.id;`);
    const orderItems = pool.query(`SELECT batteries.id, batteries.name, battery_orders.quantity, batteries.cost as price
                                    FROM batteries
                                    JOIN battery_orders ON batteries.id = battery_id
                                    WHERE battery_orders.order_id = 1;`);

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

        const templateVars = { orderDetails, orderItems };
        res.render("orders", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

    router.post("/", (req, res) => {

      const formParams = [`${req.body.name}`, `${req.body.phone}`, `${req.body.smallBattery}`];


      const addCustomerQuery = `INSERT INTO customers (name, phone_number) VALUES ($1, $2) RETURNING *;`;
      const getCustomerQuery = `SELECT id FROM customers WHERE id = $1;`;
      const createOrderQuery = `INSERT INTO orders (customer_id) VALUES ($1);`;
      const matchBatteryOrder = `INSERT INTO battery_orders (battery_id, order_id, quantity) VALUES ($1, $2, 1) RETURNING *;`;




    console.log("🚀 ~ file: orders.js ~ line 43 ~ router.post ~ req", req.body);



    pool.query(`INSERT INTO customers (name, phone_number)
    VALUES ($1, $2)
    RETURNING *;
    `, [`${req.body.name}`, `${req.body.phone}`])
      .then((customer) => {
        console.log(customer.rows);
        res.status(200);
        res.send("sucess");
      })
      .catch(() => {

      });
  });

  return router;
};
