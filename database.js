
//add resource to saved
//insert into saved_resources table user_id and resource_id
const saveResource = function (user, resource, db){
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
const deleteResourceFromSaved = function (user, resource, db){
  return db
  .query(
    `DELETE FROM saved_resources
      WHERE user_id = $1 AND resource_id = $2;
    `, [user, resource])
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
}
// get all resources by user:
const getAllResourcesByUser = function(user, db){
  return db
  .query(
    `SELECT resources.*
    FROM resources
    WHERE owner_id = $1;
    `, user)
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};
// get list of all resurces in db
const getAllResources = function(db){
  return db
  .query(
    `SELECT resources.*
    FROM resources;
    `,)
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
};

// make resource unactive
const deleteResource = function(user, resourceId, db){
return db
.query(
`
UPDATE resources
SET active = false
WHERE owner_id = $1 AND id = $2
`, [user, resourceId])
.then(res => {
  return res.rows;
})
.catch(err => console.error('query error', err.stack));
}
// comments and ratings for resource
const getCommentRating = (resourceId, db) => {
  return db
  .query(
    ` SELECT rating, comment
    FROM ratings
    WHERE resource_id = $1;
  `, [resourceId])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
};

//search, need to know what I am getting in option - object?
const searchResources = function(options, db){

}




module.exports = {
 saveResource,
 deleteResource,
 getAllResources,
 getAllResourcesByUser,
 deleteResourceFromSaved,
 getCommentRating
};
