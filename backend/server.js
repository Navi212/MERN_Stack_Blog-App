const dotenv = require('dotenv');
const app = require('./index');
const connectDb = require('./config/dbConnection');

// Activate access to .env file
dotenv.config();

// Connect to DB
connectDb();

// Define port to run on
const PORT = parseInt(process.env.EXPRESS_SERVER_PORT, 10) || 8001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server started and running on port: ${PORT}`);
});
