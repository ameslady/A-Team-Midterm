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
<<<<<<< HEAD
    });

    router.post("/", (req, res) => {
      // adds the new customers to db
      const addCustomerQuery = `INSERT INTO customers (name, phone_number) VALUES ($1, $2) RETURNING *;`;
      pool.query(addCustomerQuery, [`${req.body.name}`, `${req.body.phone}`])
      .then(customer => {
        console.log("🦋 New Customer ID:", customer.rows[0].id);

        // creates a new order using the customers id
        const createOrderQuery = `INSERT INTO orders (customer_id) VALUES ($1) RETURNING *;`;
        pool.query(createOrderQuery, [`${customer.rows[0].id}`])
        .then(newOrder => {
          console.log("🦋 Customer's Order:", newOrder.rows[0].id);

          // links the batteries and quantity to the new order
          const matchBatteryOrder = `INSERT INTO battery_orders (battery_id, order_id, quantity) VALUES ($1, $2, $3) RETURNING *;`;
          const quantity = req.body.quantity;
          pool.query(matchBatteryOrder, [`${req.body.smallBattery}`, `${newOrder.rows[0].id}`, `${quantity}`])
          .then(orderItems => {
            console.log("🦋 Order Items", orderItems.rows);
          })
        })
        res.status(200).send("sucess");
      })
      .catch(() => {
=======
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
          // console.log("🦋 Battery ID:", batteries[battery].id);
          pool.query(matchBatteryOrder, [`${batteries[battery].id}`, `${newOrder.rows[0].id}`, `${batteries[battery].quantity}`]);
        }
        res.redirect("/admin");
      })
      .catch(err => {
>>>>>>> 96e35bed9d78abc4b1c52d22a0d15160c00d290c
        res.status(500).json({ error: err.message });
      });
  });


  return router;
};
