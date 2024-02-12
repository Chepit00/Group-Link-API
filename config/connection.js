const { connect, connection } = require("mongoose");

const connectionString = "mongodb://localhost:27017/groupLinkAPI";

connect(connectionString);

module.exports = connection;
