const express = require('express');
const router = express.Router();
const { deleteResource } = require("../helpers");


module.exports = db => {
  router.post("/:id", (req, res) => {
    const currentUser = req.session.user_id;
    if(currentUser) {
      deleteResource(req.params.id, db);
      res.redirect("/resources");
    } else {
      res.redirect("/")
    }
  });
  return router;
}