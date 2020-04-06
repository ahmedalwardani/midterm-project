const express = require('express');
const router  = express.Router();
const {users, resourcesForUser, resourcesDatabase} = require("../helpers");

module.exports = () => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    const userObject = users[currentUser];
    const resourcesObject = resourcesForUser(currentUser, resourcesDatabase);
    const templateVars = {resource: resourcesObject, user: userObject};
    res.render("resource_description", templateVars);
  });
  return router;
};

