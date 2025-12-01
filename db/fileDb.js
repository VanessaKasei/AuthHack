const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "users.json");

// Read users from file
const readUsers = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Write users to file
const writeUsers = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

module.exports = { readUsers, writeUsers };
