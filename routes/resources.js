const express = require('express');
const router  = express.Router();
const {resourcesForUser} = require("../helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    resourcesForUser(currentUser, db).then(resp => {
      res.json(resp); // TODO This is just for testing until resources.ejs is created, then I would need to render
    })
      .catch(err => console.log(err));
  });
  return router;
};
