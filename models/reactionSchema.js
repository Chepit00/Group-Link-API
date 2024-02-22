// Importing the necessary modules from the 'mongoose' package
const { Schema, Types } = require("mongoose");

// Creating a new reaction schema using the Schema constructor
const reactionSchema = new Schema(
  {
    // Defining the schema for the reactionId field
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // Defining the schema for the reactionBody field
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // Defining the schema for the username field
    username: {
      type: String,
      required: true,
    },
    // Defining the schema for the createdAt field
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
  },
  {
    // Creating a new reaction schema using the Schema constructor
    toJSON: {
      getters: true,
      virtuals: true,
    },
    // Disabling the inclusion of the '_id' field in the JSON output
    id: false,
  }
);

//exporting reactionSchema model
module.exports = reactionSchema;
