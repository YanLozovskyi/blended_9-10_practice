const path = require("path");
const configPath = path.join(__dirname, "..", "config", ".env");
module.exports = require("dotenv").config({ path: configPath });
