const express = require('express');
const router  = express.Router();
const bcrypt = require("bcrypt");
const {addUser, getUserByEmail, users, generateRandomString} = require("../helpers");



module.exports = (db) => {
  router.post("/", (req,res) => {
    const randomID = generateRandomString();
    if (req.body.email === "" || req.body.password === "") {
      res.statusCode = 400;
      res.send("Error: Please provide a valid username/password");
    } else if (getUserByEmail(req.body.email, db)) { //I need this as a promiss
      res.statusCode = 400;
      res.send("Error: The e-mail address you entered is already taken. Please enter another e-mail!");
    } else {

      // users[randomID] = {
      //   id: randomID,
        let email = req.body.email;
        let password = bcrypt.hashSync(req.body.password, 10);
      //};
      addUser({email, password})
      .then(user => {
        req.session.user_id = user.id;
        res.redirect("/");
      })

    }
  });

  router.get("/", (req, res) => {
    const currentUser = users[req.session.user_id];
    if (currentUser) {
      res.redirect("/");
    } else {
      let templateVars = {user: currentUser};
      res.render("signup", templateVars);
    }
  });
  return router;
};

