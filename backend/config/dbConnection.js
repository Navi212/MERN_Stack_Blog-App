// Connect to mongodb
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const splittedUri = process.env.MONGO_URI.split('/');
    const db = splittedUri[splittedUri.length - 1];
    console.log(`Mongoose connected to db: ${db}`);
  } catch (error) {
    console.log('Mongoose connection error: ', error);
    process.exit(1);
  }
}

module.exports = connectDB;
