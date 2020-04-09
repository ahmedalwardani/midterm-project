const express = require("express");
const router = express.Router();
const { deleteUser } = require("../helpers");

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


  router.put("/", (req, res) => {
    res.status(400).end();
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

