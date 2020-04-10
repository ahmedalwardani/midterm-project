const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../helpers");


module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: {
        loggedin: false,
        email: null
      }
    };
    res.render("signin", templateVars);
  });

  router.post("/", (req, res) => {
    let password = req.body.password;
    let email = req.body.email;


    getUserByEmail(email, db)
      .then(user => {
        if (!user) {
          res.statusCode = 403;
          res.send("Error: Please provide a valid username/password");
        }

        if (bcrypt.compareSync(password, user.password)) {
          req.session.user_id = user.id;
          res.redirect('/resources');
        } else {
          res.statusCode = 403;
          res.send("Error: Please provide a valid username/password");
        }
      })
      .catch(err => console.log(err));
  });
  return router;
};

