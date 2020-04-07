const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");
const {getUserByEmail} = require("../helpers");


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
      console.log(templateVars);
      res.render("signin", templateVars);
    }
  });

  router.post("/", (req, res) => {
    let password = req.body.password;
    let email = req.body.email;


    getUserByEmail(db, email)
      .then(user => {
        if (!user) {
          res.statusCode = 403;
          res.send("Error: Please provide a valid username/password");
        }

        if (bcrypt.compareSync(password, user.password)) {
          req.session.user_id = user.id;
          res.render('index',{user});
        } else {
          res.statusCode = 403;
          res.send("Error: Please provide a valid username/password");
        }
      })
      .catch(err => console.log(err));
  });
  return router;
};

