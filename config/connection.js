// Importing the necessary modules from the 'mongoose' package
const { connect, connection } = require("mongoose");

// Defining the MongoDB connection string
const connectionString = "mongodb://localhost:27017/groupLinkAPI";

// Connecting to the MongoDB database using the provided connection string
connect(connectionString);

// Exporting the MongoDB connection object for external use
module.exports = connection;
