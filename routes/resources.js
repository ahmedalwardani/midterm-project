const express = require('express');
const router = express.Router();
const { getUserByID, singleResource, getAllResourcesOwnedByUser, getAllSavedResourceByUser, getCommentRating, isSaved, getCategoryNameFromID } = require("../helpers");

//Display all resources route
module.exports = (db) => {
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
            const templateVars = {
              user: {
                loggedin: true,
                email: user.email,
                user_id: user.id
              },
              resources_owned: _resources_owned,
              resources_saved: resp,
            };
            res.render("index", templateVars);
          });
        }).catch(err => console.log(err));
      });
    } else {
      res.redirect("/");
    }
  });


  router.get("/:id", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      getUserByID(currentUser, db).then(resp => {
        return resp;
      }).then(user => {
        singleResource(req.params.id, db).then(resp => {
          return resp;
        }).then(singleResource => {
          getCommentRating(req.params.id, db).then(resp => {
            return resp;
          }).then(ratings_comments => {
            getCategoryNameFromID(req.params.id, db).then(resp => {
              return resp;
            }).then(_category => {
              isSaved(currentUser, req.params.id, db).then(resp => {
                let _saved = true;
                if (resp.length === 0) {
                  _saved = false;
                }
                const templateVars = {
                  user: {
                    loggedin: true,
                    email: user.email,
                    user_id: user.id
                  },
                  category_name: _category,
                  resource: singleResource,
                  ratings: ratings_comments,
                  saved: _saved,
                  owner: currentUser === singleResource.owner_id ? true : false,
                };
                res.render("description", templateVars);
              });
            });
          });
        });
      }).catch(err => console.log(err));
    } else {
      res.redirect("/");
    }
  });
  return router;
};


