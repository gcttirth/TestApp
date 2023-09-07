var bcrypt = require("bcrypt.js");
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("password", salt);

console.log(hash);