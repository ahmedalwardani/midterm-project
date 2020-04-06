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

  // router.post("/", (req, res) => {
  //   const currentUser = req.session.user_id;
  //   addResource(db, resource);

  //   // addnewresource(db, info).then(resp => {

  //   res.redirect("/resources");
  // });
  return router;
};




