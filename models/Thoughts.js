// Importing the necessary modules from the 'mongoose' package
const { Schema, model } = require("mongoose");
//Importing schema from Models
const reactionSchema = require("./reactionSchema");

// Creating a new thoughtSchema using the Schema constructor
const thoughtSchema = new Schema(
  {
    // Defining the schema for the thoughtText field
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    // Defining the schema for the createdAt field
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    // Defining the schema for the username field
    username: {
      type: String,
      required: true,
    },
    // Define the 'reactions' field in the schema as an array of 'reactionSchema' objects
    reactions: [reactionSchema],
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

//virtual called reationCount that retrieves length of thoughts reactions array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Define a model named 'Thoughts' based on the 'thoughtSchema'
const Thoughts = model("Thoughts", thoughtSchema);

// Export the Thoughts model
module.exports = Thoughts;
