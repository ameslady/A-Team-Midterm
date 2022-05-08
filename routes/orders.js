const express = require('express');
const router = express.Router();

// Renders all our page views
module.exports = (pool) => {
  // Pulling from orders table and displaying data on order page
  router.get("/", (req, res) => {
    pool.query(`SELECT * FROM orders;`)
      .then(data => {
        //const templateVars = { name: data.rows[0].name };
        res.render("orders");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
