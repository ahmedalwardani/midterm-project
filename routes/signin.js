const express = require("express");
const router  = express.Router();
const {users} = require("../helpers");

module.exports = () => {
  router.get("/", (req, res) => {
    const currentUser = users[req.session.user_id];
    if (currentUser) {
      res.redirect("/urls");
    } else {
      let templateVars = {user: currentUser};
      res.render("login", templateVars);
    }
  });
  return router;
};
