// Entry point to App
const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db_connection');

// Activate access to .env file
dotenv.config();

// Connect to db
connectDb();

const app = express();

const PORT = parseInt(process.env.EXPRESS_SERVER_PORT, 10) || 8001;

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server started and running on port: ${PORT}`);
});
