const mongoose = require('mongoose');

// Define the MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mernbooksearch';

// Connect to the MongoDB database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Store the connection object in a 'db' variable
const db = mongoose.connection;

// Export the 'db' variable
module.exports = db;


