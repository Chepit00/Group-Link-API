// Define Mongoose
const mongoose = require("mongoose");

// Schema to create User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Toughts",
    },
  ],
});
// Initialize our User model
const User = model('user', userSchema);

model.exports = User;