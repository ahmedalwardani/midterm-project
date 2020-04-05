const express = require('express');
const router  = express.Router();
const {users} = require("../helpers");

module.exports = () => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    const userObject = users[currentUser];
    const templateVars = {user: userObject};
    res.render("search", templateVars);
  });
  return router;
};
