const Pool = require("pg").Pool;

const db = new Pool({
  user: "decagon",
  password: "    ",
  host: "localhost",
  port: 5432,
  database: "todoss",
});

module.exports = db;
