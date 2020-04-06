//Returns an object corresponding to a provided string, otherwise returns undefined
const getUserByEmail = (string, object) => {
  for (const obj in object) {
    if (object.hasOwnProperty(obj)) {
      if (object[obj].email === string) {
        return object[obj];
      }
    }
  }
  return undefined;
};

const resourcesForUser = (id, resourcesDatabase) => {

  const resourcesObject = {};
  for (const key in resourcesDatabase) {
    if (resourcesDatabase[key].userID === id) {
      resourcesObject[key] = resourcesDatabase[key];
    }
  }
  return resourcesObject;
};

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
    i ++;
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

module.exports = {getUserByEmail, users, resourcesForUser, resourcesDatabase, generateRandomString};

