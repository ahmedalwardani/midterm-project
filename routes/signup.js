const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { addUser, getUserByEmail } = require("../helpers");


module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: {
        loggedin: false,
        email: null
      }
    };
    res.render("signup", templateVars);
  });

  router.post("/", (req, res) => {
    if (req.body.email === "" || req.body.password === "") {
      res.statusCode = 400;
      res.send("Error: Please provide a valid username/password");
    }
    ​
    //NEEED HELP WITH THIS SECTION!!!!!!!
    getUserByEmail(req.body.email, db)
      .then(resp => {
        if (resp) {
          res.statusCode = 400;
          res.send("Error: The e-mail address you entered is already taken. Please enter another e-mail!");
        } else {
          const _password = bcrypt.hashSync(req.body.password, 10);
          const user = {
            name: req.body.name,
            email: req.body.email,
            password: _password
          };
          addUser(user, db)
            .then(resp => {
              res.redirect("/");
            });
        }
      })
      .catch(err => console.log(err));
  });
  return router;
};
​



