const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { addUser, getUserByEmail } = require("../helpers");



module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      res.redirect("/");
    } else {
      const templateVars = {
            loggedin: {
              loggedin: false,
              email: null
            }
          };
      res.render("signup", templateVars);
    }
  });

  router.post("/", (req, res) => {
    if (req.body.email === "" || req.body.password === "") {
      res.statusCode = 400;
      res.send("Error: Please provide a valid username/password");
    }

    getUserByEmail(db, req.body.email)
      .then(resp => {
        if (resp) {
          res.statusCode = 400;
          res.send("Error: The e-mail address you entered is already taken. Please enter another e-mail!");
        } else {
          let email = req.body.email;
          let password = bcrypt.hashSync(req.body.password, 10);
          addUser({ email, password }, db)
            .then(user => {
              req.session.user_id = user.id;
              res.redirect("/");
            });
        }
      })
      .catch(err => console.log(err));
  });
  return router;
};

