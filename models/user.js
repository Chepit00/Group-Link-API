// Define Mongoose
const { Schema, model, Types } = require('mongoose');


// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
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
      ref: "Thoughts",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
  {
    toJSON: {
    virtuals: true,
    },
    id: false,
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;