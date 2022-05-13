// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const twilio = require('twilio');

// twilio
const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const pool = new Pool(dbParams);
pool.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes,
// yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['hubbabubba']
}));

// Serves our static files in public directory
app.use(express.static("public"));

// Routes for each Resource
const productsRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");

// Mount all resource routes
app.use("/", productsRoutes(pool));
app.use("/orders", orderRoutes(pool, client));
app.use("/admin", adminRoutes(pool, client));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
