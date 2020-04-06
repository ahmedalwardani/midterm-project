const express = require('express');
const router  = express.Router();
const {users, resourcesForUser, resourcesDatabase} = require("../helpers");

module.exports = () => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    const userObject = users[currentUser];
    const resourcesObject = resourcesForUser(currentUser, resourcesDatabase);
    // console.log(resourcesObject);
    const templateVars = {resources: resourcesObject, user: userObject};
    res.render("resources", templateVars);
  });
  return router;
};
