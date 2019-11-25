const fs = require("fs");
const hash = require("object-hash");

module.exports = require("./helpers.factory")({ fs, hash });
