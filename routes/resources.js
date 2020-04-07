const express = require('express');
const router = express.Router();
const { resourcesForUser } = require("../helpers");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = req.session.user_id;
    if (currentUser) {
      resourcesForUser(currentUser, db).then(resp => {
        //res.json(resp); // TODO This is just for testing until resources.ejs is created, then I would need to render
        //need to see what the response is
        console.log(resp);

        //HARDCORDING TEMPLATE VARS FOR NOW
        const templateVars = {
          loggedin: {
            loggedin: true,
            email: 'example@gmail.com'
          },

          resources: [
            {
              title: "title 1",
              url: "https://github.com/ahmedalwardani/midterm-project/projects/1",
              thumbnail: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
              saved: false,
              owner: false
            },
            {
              title: "title 1",
              url: "https://github.com/ahmedalwardani/midterm-project/projects/1",
              thumbnail: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
              saved: false,
              owner: true
            },
            {
              title: "title 1",
              url: "https://github.com/ahmedalwardani/midterm-project/projects/1",
              thumbnail: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
              saved: true,
              owner: false
            }
          ]

        }

        res.render("index", templateVars);

      })
        .catch(err => console.log(err));

      // let templateVars = {};
      // res.render("index", { templateVars });
    } else {
      res.redirect("/signin");
    }
  });
  return router;
};


