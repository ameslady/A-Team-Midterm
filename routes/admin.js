const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/admin", (req, res) => {
      res.render("admin");
    });
  return router;
};
