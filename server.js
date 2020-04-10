// load .env data into process.env
require('dotenv').config();
const users = require("./helpers");


const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "dev  elopment";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require("cookie-session");



const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

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


const widgetsRoutes = require("./routes/widgets");
const usersRoutes = require("./routes/users");
const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");
const resourcesRoutes = require("./routes/resources");
const newResourceRoutes = require("./routes/new");
const searchRoutes = require("./routes/search");
const signoutRoutes = require("./routes/signout");
const searchResultsRoutes = require("./routes/search_results");
const saveRoutes = require("./routes/save");
const unsaveRoutes = require("./routes/unsave");
const deleteRoutes = require("./routes/delete");
const rateRoutes = require("./routes/rate");
const topicRoutes = require("./routes/topic");
const userRoutes = require("./routes/user");



app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/users", usersRoutes(db));
app.use("/signup", signupRoutes(db));
app.use("/signin", signinRoutes(db));
app.use("/signup", signupRoutes(db));
app.use("/resources", resourcesRoutes(db));
app.use("/new", newResourceRoutes(db));
app.use("/search", searchRoutes(db));
app.use("/signout", signoutRoutes(db));
app.use("/search_results", searchResultsRoutes(db));
app.use("/save", saveRoutes(db));
app.use("/unsave", unsaveRoutes(db));
app.use("/delete", deleteRoutes(db));
app.use("/rate", rateRoutes(db));
app.use("/topic", topicRoutes(db));
app.use("/user", userRoutes(db));

//to fix route when /:id is selected and stylesheet doesn't link properly
app.use('/static', express.static("midterm_project" + "/public"))



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



