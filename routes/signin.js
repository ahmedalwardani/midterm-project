const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");
const {users} = require("../helpers");

module.exports = () => {
  router.get("/", (req, res) => {
    const currentUser = users[req.session.user_id];
    if (currentUser) {
      res.redirect("/");
    } else {
      let templateVars = {user: currentUser};
      res.render("signin", templateVars);
    }
    console.log(users);
  });

  router.post("/", (req, res) => {
    let insuccessful = true;
    for (let key in users) {
      if (users[key].email === req.body.email && bcrypt.compareSync(req.body.password, users[key].password)) {
        req.session.user_id = users[key].id;
        res.redirect("/");
        insuccessful = false;
      }
    }

    if (insuccessful) {
      res.statusCode = 403;
      res.send("Error: Please provide a valid username/password");
    }
  });
  return router;
};

