const express = require('express');
const router = express.Router();

// module.exports = (db) => {
//   router.get("/edit", (req, res) => {
//     const currentUser = req.session.user_id;
//     if (currentUser) {
//       let templateVars = {user: currentUser};
//       res.render("resources", templateVars);
//     } else {
//       res.redirect("/signin");
//     }

//   });
//   return router;
//};
const addResource = (resource, db) => {
  //const resource = req.body
  // const title = req.body.title;
  // const url = req.body.url;
  // const thumbnail_url = req.body.thumbnail_url;
  console.log(resource)
  let arr = [resource.title, resource.url, resource.thumbnail_url, resource.owner_id, resource.topic]
  return db
    .query(
      `INSERT into resources (owner_id, title, url, thumbnail_url, category_id)
      VALUES ($4, $1, $2, $3, $5) RETURNING *;
    `, arr)
    .then(res => {
      console.log(res.rows)
      return res.rows
    })
    .catch(err => console.error('query error', err.stack))
};
exports.addResource = addResource;

module.exports = (db) => {
  router.post("/", (req, res) => {
    const userId = req.session.user_id;
    if(!req.body.topic){
      console.log("this is NOT topic")
    } else {
    //console.log("owner_id" + userId)
    addResource({ ...req.body, owner_id: userId }, db)
      .then(data => {
        //console.log(data)
        //res.send("hello", edit);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
    }
  })
  return router;
};




