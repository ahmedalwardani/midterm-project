const express = require('express');
const router  = express.Router();
const {getUserByEmail, users, generateRandomString} = require("../helpers");


module.exports = () => {
  router.post("/", (req,res) => {
    const randomID = generateRandomString();
    if (req.body.email === "" || req.body.password === "") {
      res.statusCode = 400;
      res.send("Error: Please provide a valid username/password");
    } else if (getUserByEmail(req.body.email, users)) {
      res.statusCode = 400;
      res.send("Error: The e-mail address you entered is already taken. Please enter another e-mail!");
    } else {
      users[randomID] = {
        id: randomID,
        email: req.body.email,
        password: req.body.password
      };
      req.session.user_id = randomID; //create session
      res.redirect("/");
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

