const express = require('express');
const router = express.Router();
const { addCommentRating } = require("../helpers");


module.exports = db => {
  //Posting a comment/rating route
  router.post("/:id", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      const commentRating = {
        rating: req.body.rating,
        comment: req.body.comment,
        resourceID: req.params.id,
        userID: currentUser
      };
      addCommentRating(commentRating, db);
      res.redirect(`/resources/${req.params.id}`);
    } else {
      res.redirect("/");
    }
  });
  return router;
};
