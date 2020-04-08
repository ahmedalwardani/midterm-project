const express = require('express');
const router = express.Router();
const { resourcesForUser, getUserByID, singleResource } = require("../helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      getUserByID(db, currentUser).then(resp => {
        return resp;
      }).then(user => {
        resourcesForUser(currentUser, db).then(resp => {
          return resp;
        }).then(_resources => {

          //IS SAVED ARRAY IS A FUNCTION THAT DOESN'T EXISTS YET
          isSavedArray(currentUser, db).then(resp => {
            const templateVars = {

              //CHANGED VARIABLE NAME HERE REMEMBER
              user: {
                loggedin: true,
                email: user.email,
                user_id: user.id
              },
              resources: _resources,
              saved_array: resp
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
    if (currentUser) {
      getUserByID(db, currentUser).then( resp => {
        return resp;
      }).then( user => {
        singleResource(db, req.params.id).then(resp => {
          return resp;
        }).then(singleResource => {

          //A FUNCTION THAT DOESN'T EXISTS YET
          ratingsComments(req.params.id, db).then(resp => {
            const templateVars = {

              //CHANGED VARIABLE NAME HERE REMEMBER
              user: {
                loggedin: true,
                email: user.email,
                user_id: user.id
              },
              resource: singleResource,
              ratings: resp
            };
            res.render("description", templateVars);
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
  })
    console.log(' ===========>', req.params.id);
    singleResource(db, req.params.id).then(resource => {
      // Template vars with current user??
      // TODO: res.render('resources_show', templateVars)
      res.json({resource});
    });
  });

  return router;
};


