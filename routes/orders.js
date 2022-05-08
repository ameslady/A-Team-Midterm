const express = require('express');
const router  = express.Router();

// Sends an object of all data in DB orders table
module.exports = (pool) => {
  router.get("/", (req, res) => {

    pool.query(`SELECT * FROM orders;`)
      .then(data => {
        const orders = data.rows;
        res.json({ orders });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
