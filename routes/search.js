const express = require('express');
const router = express.Router();
const { getUserByID, getCategoryNames} = require("../helpers");

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
          res.render("search", templateVars);

        }).catch(err => console.log(err));
      });
    } else {
      res.redirect("/");
    }
  });

  //NEED TO WRITE POST REQUEST GET THE LIST OF RESOURCES BACK THAT MATCHES THE SEARCH AND PASS IT TO INDEX.EJS
  return router;
};
