
//Returns an object corresponding to a provided string, otherwise returns undefined
const getUserByEmail = (email, db) => {
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

const getUserByID = (id, db) => {
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


const getAllResources = (db) => {
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



const getAllSavedResourceIDByUser = (user, db) => {
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


const getAllSavedResourceByUser = (user, db) => {
  return db
    .query(
      `SELECT resources.*
      FROM resources
      JOIN saved_resources
      ON resources.id=saved_resources.resource_id
      WHERE user_id=$1;
      `, [user])
    .then(res => res.rows)
    .catch(err => console.error("query error", err.stack));
};


const getAllResourcesIDOwnedByUser = (user, db) => {
  return db
    .query(
      `SELECT id
      FROM resources
      WHERE owner_id=$1;
      `, [user])
    .then(res => res.rows)
    .catch(err => console.error("query error", err.stack));
};

const getAllResourcesOwnedByUser = (user, db) => {
  return db
    .query(
      `SELECT *
      FROM resources
      WHERE owner_id=$1;
      `, [user])
    .then(res => res.rows)
    .catch(err => console.error("query error", err.stack));
};


const getCategoryNameFromID = (resourceID, db) => {
  return db
    .query(
      `SELECT categories.name FROM categories
      JOIN resources ON categories.id=resources.category_id
      WHERE resources.id=$1
      `, [resourceID])
    .then(res => res.rows)
    .catch(err => console.error("query error", err.stack));
};

const isSaved = function(user, id, db) {
  return db
    .query(
      `SELECT id
      FROM saved_resources
      WHERE user_id=$1 AND resource_id = $2;
      `, [user, id])
    .then(res => res.rows)
    .catch(err => console.error("query error", err.stack));
};


const addUser = function(user, db) {
  let arr = [user.name, user.email, user.password];
  return db
    .query(`
    INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING *;
  `, arr)
    .then(res => {
      return true;
    })
    .catch(err => console.error('query error', err.stack));
};

//this might need to change
const addResource = function(user, resource, db) {
  console.log(user, "user inside addResources");
  console.log(resource, "resources inside addResources");

  return db
    .query(
      `INSERT INTO resources (
    owner_id, title, url, description, thumbnail_url, category_id )
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *;
  `, [Number(user), resource.title, resource.url, resource.description, resource.thumbnail_url, Number(resource.topic_id)])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};


const deleteResource = function(resource, db) {
  return db
    .query(
      `UPDATE resources SET active=false
      WHERE resources.id=${resource}
  `)
    .then(res => true)
    .catch(err => console.error('query error', err.stack));
};


//this is suppose to get a a single resource where id is the id of the resource not the owner id
const singleResource = function(id, db) {
  return db.query(
    `
    SELECT * FROM resources
    WHERE resources.id = $1;
    `, [Number(id)])
    .then(resp => resp.rows[0])
    .catch(err => console.error('query error', err.stack));
};

//add resource to saved
//insert into saved_resources table user_id and resource_id
const saveResource = function(user, resource, db) {
  return db
    .query(
      `INSERT INTO saved_resources (user_id, resource_id)
      VALUES ($1, $2) RETURNING *;
    `, [user, resource])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};


// delete resource from saved!!
const deleteResourceFromSaved = function(user, resource, db) {
  return db
    .query(
      `DELETE FROM saved_resources
      WHERE user_id = $1 AND resource_id = $2;
    `, [user, resource])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};


const deleteUser = (user, db) => {
  return db
    .query(
      `DELETE FROM users
      WHERE id=$1
    `, [user])
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};


// const editUser = (user, fieldToEdit, db) => {
//   return db
//     .query(
//       `UPDATE FROM users
//       `)
// }


const getCommentRating = (resourceId, db) => {
  return db
    .query(
      ` SELECT rating, comment
    FROM ratings
    WHERE resource_id = $1;
  `, [resourceId])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};

const addCommentRating = (commentObject, db) => {
  return db
    .query(
      `INSERT INTO ratings (rating, resource_id, user_id, comment)
      VALUES($1, $2, $3, $4) RETURNING *;
    `, [commentObject.rating, commentObject.resourceID, commentObject.userID, commentObject.comment])
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack)
    );
};
const addCategory = (name, db) => {
  return db
    .query(
      `INSERT INTO categories (name)
      VALUES($1) RETURNING *;
    `, [name])
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack)
    );
};

//get category names functions
const getCategoryNames = db => {
  return db
    .query(
      `SELECT DISTINCT name, id
    FROM categories`
    ).then(res => {
      return res.rows;
    }).catch(err => console.error('query error', err.stack));
};

const searchResources = function(options, db) {
  const queryParams = [];
  queryParams.push(`%${options.keyword}%`);
  let queryString = `
  SELECT resources.*, avg(ratings.rating) as average_rating FROM resources JOIN ratings ON resources.id=ratings.resource_id WHERE resources.active = true AND resources.title LIKE $1 OR resources.description LIKE $1`;

  if (options.category_id) {
    queryParams.push(`${options.category_id}`);
    queryString += ` AND resources.category_id =  $${queryParams.length} `;
  }

  queryString += ` GROUP BY resources.id`;

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` HAVING avg(ratings.rating) >= $${queryParams.length}`;
  }
  return db.query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};


module.exports = {
  addUser,
  addResource,
  getUserByID,
  getUserByEmail,
  singleResource,
  isSaved,
  deleteResource,
  getAllSavedResourceIDByUser,
  getAllSavedResourceByUser,
  saveResource,
  getAllResources,
  getAllResourcesOwnedByUser,
  deleteResourceFromSaved,
  getCommentRating,
  getCategoryNames,
  searchResources,
  getAllResourcesIDOwnedByUser,
  getCategoryNameFromID,
  addCommentRating,
  addCategory,
  deleteUser
};

