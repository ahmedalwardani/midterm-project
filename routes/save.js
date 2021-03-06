const express = require('express');
const router = express.Router();
const { saveResource } = require("../helpers");

//Save a resource route
module.exports = db => {
  router.post("/:id", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      saveResource(currentUser, req.params.id, db);
      res.redirect("/resources");
    } else {
      res.redirect("/");
    }
  });
  return router;
};
