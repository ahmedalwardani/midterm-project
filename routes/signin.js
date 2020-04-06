const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");
const {users} = require("../helpers");

const {getUserByEmail} = require("../helpers")
const login = (email, password, db) => {
  return getUserByEmail(email,db)
  .then(user => {
    if(!user){
      return null;
    }
    if(bcrypt.compareSync(password, user.password)){
      return user;
    }
  } )
}


module.exports = (db) => {
  router.get("/", (req, res) => {
    const currentUser = users[req.session.user_id];
    if (currentUser) {
      res.redirect("/");
    } else {
      let templateVars = {user: currentUser};
      res.render("signin", templateVars);
    }
    console.log(users);
  });

  router.post("/", (req, res) => {
    console.log(req.body)
    let password = req.body.password;
    let email = req.body.email;
    login(email, password, db)
      .then(user => {
        res.render('index',{user})
      })




    // let insuccessful = true;
    // for (let key in users) {
    //   if (users[key].email === req.body.email && bcrypt.compareSync(req.body.password, users[key].password)) {
    //     req.session.user_id = users[key].id;
    //     res.redirect("/");
    //     insuccessful = false;
    //   }
    // }

    // if (insuccessful) {
    //   res.statusCode = 403;
    //   res.send("Error: Please provide a valid username/password");
    // }
  });
  return router;
};

