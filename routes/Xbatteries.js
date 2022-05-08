const express = require('express');
const router = express.Router();

// Sends a json object of all data in DB batteries table
module.exports = (pool) => {
  router.get("/", (req, res) => {
    pool.query(`SELECT * FROM batteries;`)
      .then(data => {
        const batteries = data.rows;
        res.json({ batteries: batteries });
        const templateVars = { name: data.rows[0].name };
        console.log(templateVars);
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

// app.get("/urls", (req, res) => {
//   const userID = req.session.userID;

//   if (!userID) {
//     res.redirect("login");
//   } else {
//     const templateVars = { user: users[userID], urls: urlsForUser(userID, urlDatabase)};
//     res.render("urls-index", templateVars);
//   }
// });
