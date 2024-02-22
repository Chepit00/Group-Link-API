// Import required modules
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Port number for the server to listen on
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse incoming requests as URL encoded or JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Attach the defined routes to the Express application
app.use(routes);

// Start the server and listen for incoming requests
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
