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

  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      getUserByID(currentUser, db).then(resp => {
        return resp;
      }).then(user => {
        getAllResourcesOwnedByUser(currentUser, db).then(resp => {
          return resp;
        }).then(_resources_owned => {
          getAllSavedResourceByUser(currentUser, db).then(resp => {
            return resp;
          }).then( _resources_saved => {
            searchResources(options, db).then(resp => {
              const templateVars = {
                user: {
                  loggedin: true,
                  email: user.email,
                  user_id: user.id
                },
                resources_owned: _resources_owned,
                resources_saved: _resources_saved,
                search_results: resp
              };
              res.render("results", templateVars);
            })
          })
        }).catch(err => console.log(err));
      });
    } else {
      res.redirect("/");
    }
  });
  return router;
};


