const express = require('express');
const router = express.Router();
const { resourcesForUser, getUserByID, singleResource, getAllResourcesOwnedByUser, getAllSavedResourceByUser, getCommentRating} = require("../helpers");

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

              resources_saved: resp
            };
            res.render("index", templateVars);
          })
        }).catch(err => console.log(err));
      });
    } else {
      res.redirect("/");
    }
  });


  router.get("/:id", (req,res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      getUserByID(currentUser, db).then( resp => {
        // res.json(resp);
        return resp;
      }).then( user => {
        singleResource(req.params.id, db).then(resp => {
          res.json(resp);
          return resp;
        }).then(singleResource => {
          getCommentRating(req.params.id, db).then(resp => {
            return resp;
          }).then( ratings_comments => {
            isSaved(currentUser, req.params.id, db).then(resp => {
              const templateVars = {
                user: {
                  loggedin: true,
                  email: user.email,
                  user_id: user.id
                },
                resource: singleResource,
                ratings: ratings_comments,
                saved: resp,
                owner: currentUser === singleResource.owner_id ? true : false
              };
              res.render("description", templateVars);
            })
          })
        }).catch(err => console.log(err));
      })
    } else {
      res.redirect("/");
    }
    // console.log(' ===========>', req.params.id);
    // singleResource(db, req.params.id).then( resource => {
    //   // Template vars with current user??
    //   // TODO: res.render('resources_show', templateVars)
    //   res.json({resource});
    // })
  // })
  //   console.log(' ===========>', req.params.id);
  //   singleResource(db, req.params.id).then(resource => {
  //     // Template vars with current user??
  //     // TODO: res.render('resources_show', templateVars)
  //     res.json({resource});
  //   });
  });

  return router;
};


