const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      let templateVars = {user: currentUser};
      res.render("edit", templateVars);
    } else {
      res.redirect("/signin");
    }
  });
  return router;
};
