const express = require('express');
const router  = express.Router();

// Sends a json object of all data in DB batteries table
module.exports = (pool) => {
  router.get("/", (req, res) => {
    pool.query(`SELECT * FROM batteries;`)
      .then(data => {
        const batteries = data.rows;
        res.json({ batteries: batteries });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
