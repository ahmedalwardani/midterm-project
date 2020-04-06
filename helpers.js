//Returns an object corresponding to a provided string, otherwise returns undefined
const getUserByEmail = (db, email) => {
  return db.query(`
    SELECT *
    FROM users
    WHERE email = $1
  `, [email])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
};

const addUser = function(user, db) {
  let arr = ['bob', user.email, user.password];   //change bob to user.name
  return db
    .query(`
    INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;
  `, arr)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
};

const addResource = function(resource, db) {
  let resourceValues = Object.values(resource);
  return db
    .query(
      `INSERT INTO resources (
    owner_id, title, type, url, description)
    VALUES($1, $2, $3, $4, $5) RETURNING *;
  `, resourceValues)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
};


//function resourcesForUser has not connected yet
const resourcesForUser = function(id, db) {
  return db
    .query(
      `SELECT resources.*
    FROM resources
    JOIN users ON owner_id = users.id
    WHERE users.id = $1;
    `, [id])
    .then(res => {
      console.log(res.rows[0]);
    })
    .catch(err => console.error('query error', err.stack));
};

const singleResource = function(db, id) {
  return db.query(
    `
    SELECT * FROM resources
    WHERE resources.owner_id = $1;
    `, [Number(id)])
    .then(resp => resp.rows[0])
    .catch(err => console.error('query error', err.stack));
};





module.exports = {
  addUser,
  addResource,
  getUserByEmail,
  resourcesForUser,
  singleResource,
};

