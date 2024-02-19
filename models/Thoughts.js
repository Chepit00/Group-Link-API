const { Schema, model } = require('mongoose');
const reactionSchema = require('./reactionSchema');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    minlength: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },

  reactions: [reactionSchema],
},
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
});

//virtual called reationCount that retrieves length of thoughts reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;
