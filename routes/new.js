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




    // const currentUser = req.session.user_id;
    // if (currentUser) {
    //   let templateVars = {
    //     loggedin: {
    //       loggedin: true,
    //       //HARDCODING EMAIL
    //       email: 'example@gmail.com'
    //     },

    //     //HARD CODING CATEGORY ID *********NEED QUERIES FOR CATEGORY NAME*****************
    //     topics: {
    //       category_id: "javascript",
    //       category_id: "php",
    //       category_id: "react"
    //     }
    //   };
    //   res.render("new", templateVars);
    // } else {
    //   res.redirect("/signin");
    // }
  });

  //what the heck is this?????
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
