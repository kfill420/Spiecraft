require('dotenv').config();
const express = require('express');
const router = require('./routers');
const path = require(`node:path`);
const port = process.env.PORT || `3000`;
const app = express();
const cors = require("cors");
const sessionMiddleware = require('./middlewares/sessionMiddleware');

app.use(cors({
  origin: ['http://localhost:5173', 'https://kfill420.github.io'],
  optionsSuccessStatus: 200
}));

app.use(express.static(path.join(__dirname, './public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});