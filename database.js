
//add resource to saved
//insert into saved_resources table user_id and resource_id
const saveResource = function (user, resource, db){
  return db
  .query(
    `INSERT INTO saved_resources (user_id, resource_id)
      VALUES (${user}, ${resource}) RETURNING *;
    `, [user, resource])
    .then(res => {
      return res.rows[0]
    })
    .catch(err => console.error('query error', err.stack));
}

// delete resource from saved!!
const deleteResource = function (user, resource, db){
  return db
  .query(
    `DELETE FROM saved_resources
      WHERE user_id = ${user} AND resource_id = ${resource};
    `, [user, resource])
    .then(res => {
      return res.rows[0]
    })
    .catch(err => console.error('query error', err.stack));
}


module.exports = {
 saveResource,
 deleteResource
};
