// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

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

// Do we need this? Are we going to use SASS?
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

// Serves our static files in public directory
app.use(express.static("public"));

// Database Routes for each Resource
// const batteryRoutes = require("./routes/Xbatteries"); <--might not need
const orderRoutes = require("./routes/orders");

// Page Routes
const pageRoutes = require("./routes/pages");

// Mount all resource routes
// app.use("/batteries", batteryRoutes(pool)); <--might not need
app.use("/orders", orderRoutes(pool));
app.use("/", pageRoutes(pool));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
