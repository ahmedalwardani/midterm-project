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

module.exports = {getUserByEmail, users};

