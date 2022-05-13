const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // pulls from batteries table and displays data on home page (menu)
  router.get("/", (req, res) => {
    const orderSession = req.session.order_id;
    const productQuery = `SELECT * FROM batteries;`;

    pool.query(productQuery)
      .then(data => {
        const batteries = {};

        for (const item of data.rows) {
          batteries[item.id] = item;
        }
        const templateVars = { orderSession, batteries };
        res.render("products", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
