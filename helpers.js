//Returns an object corresponding to a provided string, otherwise returns undefined

  const queryFunction = (statement, values, callback) => {
    return pool.query(statement, values)
      .then(res => callback(res.rows));
  }


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
    .query(`
    INSERT INTO users (name, email, password)
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

const singleResource = function(id, db) {
  return db.queryFunction(
    `
    SELECT* FROM resources
    WHERE resources.id = $1;
    `
  , [id], rows => console.log(rows[0]));
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
  b2xVn2: {title: "test resource 1", resourceURL:"http://www.lighthouselabs.ca", userID: "test 1", thumbnail: "thumbnail 1", owner: "owner 1", isSaved: true, averageRating: 5, ratings: [{rating: 5, comment: "awesome"}, {rating: 5, comment: "cool"}, {rating: 5, comment: "original"},]},

  qsm5xK: {title: "test resource 2", resourceURL:"http://www.google.ca", userID: "test 2", thumbnail: "thumbnail 2", owner: "owner 2", isSaved: false, averageRating: 3, ratings: [{rating: 3, comment: "not bad"}, {rating: 3, comment: "bad"}, {rating: 3, comment: "average"},]},
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
    name: "Ahmed",
    id: "1",
    email: "ahmed@ahmed.com",
    password: "password"
  },
  "Linh": {
    name: "Linh",
    id: "2",
    email: "linh@linh.com",
    password: "password"
  },
  "Andrii": {
    name: "Andrii",
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
  singleResource,
  queryFunction
};

