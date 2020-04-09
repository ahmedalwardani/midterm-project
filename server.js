// load .env data into process.env
require('dotenv').config();
const users = require("./helpers");


// Web server config
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "dev  elopment";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require("cookie-session");



// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use(cookieSession({
  name: "session",
  keys: ["user_id"],
  maxAge: 60 * 60 * 1000
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const usersRoutes = require("./routes/users");
const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");
const resourcesRoutes = require("./routes/resources");
const newResourceRoutes = require("./routes/new");
const searchRoutes = require("./routes/search");
const signoutRoutes = require("./routes/signout");
const testRoutes = require("./routes/test");
const userRoutes = require("./routes/users");
const searchResultsRoutes = require("./routes/search_results");
const saveRoutes = require("./routes/save");
const unsaveRoutes = require("./routes/unsave");
const deleteRoutes = require("./routes/delete");
const rateRoutes = require("./routes/rate");
const topicRoutes = require("./routes/topic");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/users", usersRoutes(db));
app.use("/signup", signupRoutes(db));
app.use("/signin", signinRoutes(db));
app.use("/signup", signupRoutes(db));
app.use("/resources", resourcesRoutes(db));
app.use("/new", newResourceRoutes(db));
app.use("/search", searchRoutes(db));
app.use("/signout", signoutRoutes(db));
app.use("/test", testRoutes(db));
app.use("/search_results", searchResultsRoutes(db));
app.use("/save", saveRoutes(db));
app.use("/unsave", unsaveRoutes(db));
app.use("/delete", deleteRoutes(db));
app.use("/rate", rateRoutes(db));
app.use("/topic", topicRoutes(db));



// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  const currentUser = users[req.session.user_id];
  let templateVars = { user: currentUser };
  if (currentUser) {
    res.render("index", templateVars);
  } else {
    res.render("landing_page", {user: null});
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



