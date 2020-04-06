const express = require('express');
const router  = express.Router();
const {singleResource} = require("../helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const ratingsArray = [];
    const currentUser = req.session.user_id;
    singleResource(db, currentUser).then((resp) => {
      const resource = {
        id: resp.id,
        owner_id: resp.owner_id,
        title: resp.title,
        type: resp.type,
        url: resp.url,
        thumbnail: null,
        description: resp.description,
        active: resp.active,
        //saved: use query to see whether user saved resource in the saved_resources table
        owner: currentUser === resp.owner_id ? true : false,
        ratings: ratingsArray
      };

      res.render("description", {resource});

    }).catch(err => console.log(err));

  });
  return router;
};
