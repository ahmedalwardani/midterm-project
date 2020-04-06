//Returns an object corresponding to a provided string, otherwise returns undefined
const getUserByEmail = (email, db) => {
  return db
  .query(`
    SELECT *
    FROM users
    WHERE email = $1
  `, [email])
    .then(res => {
      return res.rows[0]
    })
    .catch(err => console.error('query error', err.stack));
};

const addUser = function (user, db) {
  let arr = ['bob', user.email, user.password];   //change bob to user.name
  return db
    .query(
      `INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;
  `, arr)
    .then(res => {
      console.log(res.rows[0])
      return res.rows[0]
    })
    .catch(err => console.error('query error', err.stack));
}
const addResources = function(resource) {
  let resourceValues = Object.values(resource)
  return db
  .query(
    `INSERT INTO resources (
    owner_id, title, type, url, description)
    VALUES($1, $2, $3, $4, $5) RETURNING *;
  `, resourceValues)
  .then(res => {
    return res.rows[0]
  })
  .catch(err => console.error('query error', err.stack));
};


//function resourcesForUser has not connected yet
const resourcesForUser = function (id, db){
  return db
  .query(
    `SELECT resources.*
    FROM resources
    JOIN users ON owner_id = users.id
    WHERE users.id = $1;
    `, [id])
    .then(res => {
      return res.rows[0]
    })
    .catch(err => console.error('query error', err.stack));
  };

// const resourcesForUser = (id, resourcesDatabase) => {

//   const resourcesObject = {};
//   for (const key in resourcesDatabase) {
//     if (resourcesDatabase[key].userID === id) {
//       resourcesObject[key] = resourcesDatabase[key];
//     }
//   }
//   return resourcesObject;
// };

 const resourcesDatabase = {
  b2xVn2: { resourceURL: "http://www.lighthouselabs.ca", userID: "test1" },
  qsm5xK: { resourceURL: "http://www.google.com", userID: "test2" }
};






const generateRandomString = () => {
  const str = "abcdefghijklmnopqrstuvwxyz0123456789";
  let ans = "";
  let i = 0;
  while (i < 6) {
    ans += str[Math.floor(Math.random() * str.length)];
    i++;
  }
  return ans;
};

const users = {
  "Ahmed": {
    id: "1",
    email: "ahmed@ahmed.com",
    password: "password"
  },
  "Linh": {
    id: "2",
    email: "linh@linh.com",
    password: "password"
  },
  "Andrii": {
    id: "3",
    email: "andrii@andrii.com",
    password: "password"
  },
};

module.exports = {
  addUser,
  addResources,
  getUserByEmail,
  users,
  resourcesForUser,
  resourcesDatabase,
  generateRandomString,

};

