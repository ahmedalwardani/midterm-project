const express = require("express");
const router = express.Router();
const { deleteUser, editUser, getPasswordForUser} = require("../helpers");
const bcrypt = require("bcrypt");

module.exports = db => {
  router.get("/", (req, res) => {
    const templateVars = {
      user: {
        loggedin: true,
        email: req.session.email
      }
    };
    res.render("user", templateVars);
  });


  router.post("/", (req, res) => {
    console.log("starting post");
    const currentUser = req.session.user_id;
    if (currentUser) {
      getPasswordForUser(currentUser, db).then(resp => {
        return resp;
      }).then(currentPassword => {
        if (bcrypt.compareSync(req.body.password, currentPassword)) {
          console.log("reached line 28");
          editUser(currentUser, {nameValue: req.body.name, emailValue: req.body.email, passwordValue: bcrypt.hashSync(req.body.newPassword, 10)}, db);
          res.status(200).end();
          console.log("edited");
        } else {
          res.status(500);
          console.log("can't edit sorry");
        }
      })
        .catch(err => console.log(err));
    }
    res.redirect("/");
  });


  router.delete("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      deleteUser(currentUser, db);
      res.status(200).end();
    }
  });
  return router;
};

