const express = require('express');
const router  = express.Router();
const {addResource} = require("../helpers");


module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      let templateVars = {user: currentUser};
      res.render("new", templateVars);
    } else {
      res.redirect("/signin");
    }
  });

  router.post("/", (req, res) => {
    console.log("reached");
    const currentUser = req.session.user_id;
    addResource(currentUser, req.body, db).then(resp => {
      console.log(resp);
      if (resp) {
        console.log("added");
        res.redirect("/resources");
      } else {
        console.log("cannot add");
      }
    })
      .catch(err => console.log(err));
  });
  return router;
};
