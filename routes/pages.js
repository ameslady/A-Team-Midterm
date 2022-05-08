const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/admin", (req, res) => {
    res.render("admin");
  });

  router.get("/order", (req, res) => {
    res.render("order");
  });

  return router;
};
