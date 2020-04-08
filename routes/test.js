const express = require('express');
const router = express.Router();
const { getAllSavedResourcesByUser } = require("../helpers");

module.exports = db => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    getAllSavedResourcesByUser(db, currentUser)
      .then(response => res.json(response));
  });
  return router;
};
