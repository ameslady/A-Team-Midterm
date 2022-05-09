const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // Pulls from batteries table and displays data on home page (menu)
  router.get("/", (req, res) => {
    pool.query(`SELECT * FROM batteries;`)
      .then(data => {
        const batteries = {};

        for (const item of data.rows) {
          batteries[item.id] = item;
        }
        const templateVars = { batteries };
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};