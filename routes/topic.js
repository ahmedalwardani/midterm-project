const express = require('express');
const router = express.Router();
const { addCategory } = require("../helpers");


module.exports = db => {
router.post("/", (req, res) => {
  const currentUser = req.session.user_id;
  if(currentUser) {
    addCategory(req.body.topic_name, db).then(resp => {
      res.redirect("/new");
    });
  } else {
    res.redirect("/")
  }
});
return router;
}
