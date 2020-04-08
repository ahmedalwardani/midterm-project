const express = require('express');
const router = express.Router();
const { getUserByID, getCategoryNames, searchResources, isSaved} = require("../helpers");

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

  // router.get("/", (req, res) => {
  //   const currentUser = req.session.user_id;
  //   if (currentUser) {
  //     getUserByID(currentUser, db).then(resp => {
  //       res.json(resp);
  //       return resp;
  //     }).then(user => {
  //       //need to change name of function
  //       getAllResourcesOwnedByUser(currentUser, db).then(resp => {
  //         return resp;

  //       //need to change name of function
  //     }).then(_resources_owned => {
  //         getAllSavedResourceByUser(currentUser, db).then(resp => {
  //           return resp;
  //         }).then( _resources_saved => {

  //           //CHECK OPTION AND req.body so things match up ect
  //           const options ={
  //             keyword: req.body.keyword,
  //             minimum_rating: req.body.min_rating,
  //             category_id: req.body.topic

  //           };

  //           searchResources(options, db).then(resp => {
  //             res.json(resp);
  //             const templateVars = {
  //               user: {
  //                 loggedin: true,
  //                 email: user.email,
  //                 user_id: user.id
  //               },
  //               resources_owned: _resources_owned,
  //               resources_saved: _resources_saved,
  //               search_results: resp
  //             };
  //             res.render("results", templateVars);
  //           })
  //         })
  //       }).catch(err => console.log(err));
  //     });
  //   } else {
  //     res.redirect("/");
  //   }
  // });
  return router;
};


