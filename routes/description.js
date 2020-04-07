const express = require('express');
const router = express.Router();
const { singleResource, isSaved } = require("../helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    singleResource(db, currentUser).then((resp) => {

      const templateVars = {

        loggedin: {
          loggedin: true,
          //HARDCODING EMAIL
          email: 'example@gmail.com'
        },

        resource: {
          title: resp.title,
          type: resp.type,
          url: resp.url,
          thumbnail: resp.thumbnail_url,
          description: resp.description,
          active: resp.active,
          owner: currentUser === resp.owner_id ? true : false,
          //HARDCODING SAVED AND AVERAGE RATING
          saved: isSaved(),
          average_rating: 3
        },
        //HARD CODING IN RATINGS ARRAY
        ratings: [{rating: 4, comment: "awesome"}, {rating: 4, comment: "awesome"}, {rating: 1, comment: " not awesome"}]
      };


      resp.render("description", { templateVars });

    }).catch(err => console.log(err));

  });
  return router;
};
