const { user, Thoughts } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await user.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUsers(req, res) {
    try {
      const users = await user
        .findOne({ _id: req.params.userId })
        .select("-__v");

      if (!users) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const { username, email } = req.body;
      const newUser = await user.create({ username, email });

      res.status(201).json({ newUser, message: "NEW USER!"});
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const users = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!users) {
        res.status(404).json({ message: "No user with this ID!" });
      }

      res.json({ users, message: "Successfully Updated" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const users = await user.findByIdAndDelete({
        _id: req.params.userId,
      });

      if (!users) {
        return res.status(404).json({ message: "No such user exists." });
      }

      const thought = await Thoughts.deleteMany({ userId: req.params.userId });

      if (!thought) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "User successfully deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to the user's friend list
  async addFriend(req, res) {
    console.log("Adding a friend");
    try {
      const users = await user.findById(req.params.userId);
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }

      const friend = await user.findById(req.params.friendsId);
      if (!friend) {
        return res.status(404).json({ message: "Friend not found" });
      }

      // Check if the friend is already in the user's friend list
      if (users.friends.includes(req.params.friendsId)) {
        return res.status(400).json({ message: "Friend already in the list" });
      }

      // Add the friend to the user's friend list
      users.friends.push(req.params.friendsId);
      await users.save();

      res.json(users);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error adding friend", error: err.message });
    }
  },

  
  async removeFriend(req, res) {
    console.log("Removing a friend");
    try {
      const users = await user.findById(req.params.userId);
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }

      // Remove the friend from the user's friend list
      users.friends = users.friends.filter(
        (friendId) => friendId != req.params.friendsId
      );
      await users.save();

      res.json(users);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error removing friend", error: err.message });
    }
  },
};
