// Importing the necessary modules from the 'mongoose' package
const { Schema, model, Types } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    // Defining the schema for the username field
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Defining the schema for the email field
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    // Defining the schema for the thoughtText field
    // Reference the 'Thoughts' model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    // Reference the 'User' model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Include virtual properties when serializing to JSON
    toJSON: {
      virtuals: true,
    },
    // Exclude the '_id' field from JSON serialization
    id: false,
  }
);

//virtual property called 'friendCount' to calculate the number of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model("User", userSchema);

//export the user model
module.exports = User;
