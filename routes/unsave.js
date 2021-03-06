const express = require('express');
const router = express.Router();
const { deleteResourceFromSaved } = require("../helpers");

//Remove a resource from a user's saved resources route
module.exports = db => {
  router.post("/:id", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      deleteResourceFromSaved(currentUser, req.params.id, db);
      res.redirect("/resources");
    } else {
      res.redirect("/");
    }
  });
  return router;
};
