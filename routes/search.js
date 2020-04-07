const express = require('express');
const router  = express.Router();
const {users} = require("../helpers");

module.exports = () => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      let templateVars = {
        loggedin: {
          loggedin: true,
          //HARDCODING EMAIL
          email: 'example@gmail.com'
        },

        //HARD CODING CATEGORY ID *********NEED QUERIES FOR CATEGORY NAME*****************
        topics: {
          category_id: "javascript",
          category_id: "php",
          category_id: "react"
        }
      };
      res.render("search",  {templateVars});
    } else {
      res.redirect("/signin");
    }
  });
  return router;
};
