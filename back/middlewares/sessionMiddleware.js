const pg = require("pg");
const session = require("express-session");

const client = new pg.Client(process.env.PG_URL);
client.connect();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: { secure: false }
});

module.exports = sessionMiddleware;
