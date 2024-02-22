const { Thoughts, user, reactionSchema } = require('../models');
const {Types} = require('mongoose')

module.exports = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thoughts.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async newThought(req, res) {
    try {
      const { thoughtText, username } = req.body;
      const users = await user.findOne(
        { username },
      );

      if (!users) {
        return res.status(404).json({ message: "No users with that info!" });
      }

          const thought = await Thoughts.create({
            thoughtText: thoughtText,
            username: username,
            userId: user._id,
          });

          users.thoughts.push(thought._id);

          await users.save();

      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this Id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findByIdAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID." });
      }
      res.status(200).json({ message: "Thought successfully deleted! (:" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ message: "No thought with that ID" });
    } catch (e) {
      res.status(500).json(e);
    }
  },


  async deleteReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.status(200).json({ thought, message: "Reaction deleted!"});
    } catch (err) {
      res.status(500).json(err);
    }
  },
};