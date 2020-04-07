const express = require('express');
const router = express.Router();
const { resourcesForUser, getUserByID, singleResource } = require("../helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      getUserByID(db, currentUser).then( resp => {
        return resp;
      }).then( user => {
        resourcesForUser(currentUser, db).then(resp => {
          const templateVars = {
            loggedin: {
              loggedin: true,
              email: user.email
            },
            resources: resp
          };
          res.render("index", templateVars);

        }).catch(err => console.log(err));
      })
    } else {
      res.send('user not logged in!');
    }
  });

  router.get("/:id", (req,res) => {
    console.log(' ===========>', req.params.id);
    singleResource(db, req.params.id).then( resource => {
      // Template vars with current user??
      // TODO: res.render('resources_show', templateVars)
      res.json({resource});
    })
  })

  return router;
};


