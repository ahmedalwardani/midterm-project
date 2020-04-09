const express = require('express');
const router = express.Router();
const { getUserByID, searchResources, getAllResourcesIDOwnedByUser, getAllSavedResourceIDByUser} = require("../helpers");


module.exports = (db) => {
  router.post("/", (req, res) => {
  const currentUser = req.session.user_id;
  if (currentUser) {
    getUserByID(currentUser, db).then(resp => {
      return resp;
    }).then(user => {
      //need to change name of function
      getAllResourcesIDOwnedByUser(currentUser, db).then(resp => {
        return resp;
      //need to change name of function
    }).then(_resources_owned => {
      getAllSavedResourceIDByUser(currentUser, db).then(resp => {
        
          return resp;
        }).then( _resources_saved => {
          //CHECK OPTION AND req.body so things match up ect
          const options ={
            keyword: req.body.keyword,
            minimum_rating: req.body.min_rating,
            category_id: req.body.topic
          };
          
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
}