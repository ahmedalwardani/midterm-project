const express = require('express');
const router = express.Router();
const { addResource, getUserByID, getCategoryNames } = require("../helpers");


module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      getUserByID(currentUser, db).then(resp => {
        return resp;
      }).then(user => {
        getCategoryNames(db).then(resp => {
          let templateVars = {
            user: {
              loggedin: true,
              email: user.email
            },
            topics: resp
          };
          res.render("new", templateVars);

        }).catch(err => console.log(err));
      });
    } else {
      res.redirect("/");
    }
  });

  router.post("/", (req, res) => {

    const currentUser = req.session.user_id;
    const resource = {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description,
      thumbnail_url: req.body.thumbnail_url || "/assets/logo.png",
      topic_id: req.body.topic,
    }
    addResource(currentUser, resource, db).then(resp => {
      if (resp) {
        res.redirect("/resources");
      } else {
        console.log("cannot add");
      }
    })
      .catch(err => console.log(err));
  });
  return router;
};
