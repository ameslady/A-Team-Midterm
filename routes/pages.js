const express = require('express');
const router = express.Router();

// Renders all our page views
module.exports = (pool) => {
  // Pulling from batteries table and displaying data on home page
  router.get("/", (req, res) => {
    pool.query(`SELECT * FROM batteries;`)
      .then(data => {
        const templateVars = { name: data.rows[0].name };
        res.render("index", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/admin", (req, res) => {
    res.render("admin");
  });

  router.get("/order", (req, res) => {
    res.render("order");
  });

  return router;
};
