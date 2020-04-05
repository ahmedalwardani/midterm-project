//Returns an object corresponding to a provided string, otherwise returns undefined
const getUserByEmail = (string, object) => {
console.log(string)
console.log(object)


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
  b2xVn2: {resourceURL:"http://www.lighthouselabs.ca", userID: "test1"},
  qsm5xK: {resourceURL:"http://www.google.com", userID: "test2"}
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

module.exports = {getUserByEmail, users, resourcesForUser, resourcesDatabase, generateRandomString};

