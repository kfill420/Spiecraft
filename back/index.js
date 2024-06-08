require('dotenv').config();
const express = require('express');
const router = require('./routers');
const session = require('express-session');
const path = require(`node:path`);
const port = process.env.PORT || `3000`;
const app = express();
const cors = require("cors");

app.use(cors({
  origin: 'https://kfill420.github.io',
  optionsSuccessStatus: 200
}));

app.use(express.static(path.join(__dirname, './public')));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'Guess it!',
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60)
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});