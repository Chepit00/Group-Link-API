const { Schema } = require("mongoose");


const thoughtSchema = new Schema({
  thoughtText: {
    type: stringify,
    required: true,
    maxlength: 280,
    minlength: 1,
  },
  createdAt: {
    type: Date, 
    default: Date.now,
    //Add getter function add here 
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
  }
);


//virtual called reationCount that retrieves length of thoughts reactions array field on query
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

module.exports = thoughtSchema;
