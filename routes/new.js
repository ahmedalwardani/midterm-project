const express = require('express');
const router  = express.Router();
const {users, generateRandomString, resourcesDatabase} = require("../helpers");


module.exports = () => {
  router.get("/", (req, res) => {
    const currentUser = users[req.session.user_id];
    if (currentUser) {
      let templateVars = {user: currentUser};
      res.render("new", templateVars);
    } else {
      res.redirect("/signin");
    }
  });

  router.post("/", (req, res) => {
    const currentUser = users[req.session.user_id];
    const testURL = generateRandomString();
    resourcesDatabase[testURL] = {
      resourceURL: req.body.resourceURL,
      userID: currentUser.id
    };
    res.redirect("/resources");
  });

  return router;
};




