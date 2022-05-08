const express = require('express');
const router  = express.Router();

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
