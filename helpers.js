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
const getUserByID = (db, id) => {
  return db.query(`
    SELECT *
    FROM users
    WHERE id = $1
  `, [id])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
};


const getAllResources = db => {
  return db
    .query(
      `SELECT resources.*
    FROM resources;
    `)
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};

const getAllSavedResourcesByUser = (db, user) => {
  return db
    .query(
      `SELECT saved_resources.resource_id
      FROM resources
      JOIN saved_resources
      ON resources.id=saved_resources.resource_id
      WHERE user_id=$1;
      `, [user])
    .then(res => res.rows)
    .catch(err => console.error("query error", err.stack));
};

const isSaved = (db, user, id) => {
  let found = false;
  getAllSavedResourcesByUser(db, user)
    .then(resp => {
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].resource_id === id) {
          found = true;
          break;
        }
      }
      return found;
    });
};



//select resources.id from RESOURCES JOIN saved_resources ON resources.id=saved_resources.resource_id WHERE user.id =


const addUser = function(user, db) {
  let arr = [user.name, user.email, user.password];
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

const addResource = function(user, resource, db) {
  let resourceValues = Object.values(resource);
  return db
    .query(
      `INSERT INTO resources (
    owner_id, title, type, url, description)
    VALUES($1, $2, $3, $4, $5) RETURNING *;
  `, [Number(user), ...resourceValues, "TEST NOT YET IMPLEMENETED"])
    .then(res => {
      //console.log(res.rows); need to check what we are getting and probabbly change accordingly
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};

const deleteResource = function(resource, db) {
  return db //just deleting from users as we don't use it
    .query(
      `UPDATE resources SET active=false
      WHERE resources.id=${resource}
  `)
    .then(res => true)
    .catch(err => console.error('query error', err.stack));
};

const editResource = function(resource, field, value, db) {
  return db.query(
    `UPDATE resources SET ${field}=$1
    WHERE resources.id=${resource}
    `
    , [value])
    .then(res => res.rows[0])
    .catch(err => console.error("query error", err.stack));
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
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};

//this is suppose to get a a single resource where id is the id of the resource not the owner id
const singleResource = function(db, id) {
  return db.query(
    `
    SELECT * FROM resources
    WHERE resources.id = $1;
    `, [Number(id)])
    .then(resp => resp.rows[0])
    .catch(err => console.error('query error', err.stack));
};





module.exports = {
  addUser,
  addResource,
  getUserByID,
  getUserByEmail,
  resourcesForUser,
  singleResource,
  isSaved,
  getAllResources,
<<<<<<< HEAD
  deleteResource
=======
  getAllSavedResourcesByUser
>>>>>>> master
};

