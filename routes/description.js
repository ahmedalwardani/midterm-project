const express = require('express');
const router  = express.Router();
const {users, resourcesForUser, resourcesDatabase, singleResource} = require("../helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    const resourceObject = singleResource(currentUser, resourcesDatabase);
    const userObject = users[currentUser];
    const templateVars = {resource: resourcesObject, user: userObject};
    res.render("description", templateVars);
  });
  return router;
};

