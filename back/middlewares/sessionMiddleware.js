// Replaced by JWT
const pg = require("pg");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const pgPool = new pg.Pool({
  connectionString: process.env.PG_URL
})

const sessionMiddleware = session({
  store: new pgSession({
    pool: pgPool,
    tableName: "users_session",
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  cookie: { secure: false }
});

module.exports = sessionMiddleware;
