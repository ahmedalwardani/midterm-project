const express = require('express');
const router  = express.Router();

//signout route
module.exports = () => {
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/");
  });
  return router;
};
