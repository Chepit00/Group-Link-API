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
            const users = await user.findOne({ _id: req.params.userId })
                .select('-__v');
            
            if (!users) {
                return res.status(404).json({ message: 'No user with that ID'})
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
            
            res.status(201).json(newUser);
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
                res.status(404).json({ message: 'No user with this ID!' });
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const users = await user.findOneAndRemove({ _id: req.params.userId });

            if (!users) {
                return res.status(404).json({ message: 'No such user exists.' });
            }

            const thought = await Thoughts.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'User deleted, but no thoughts found',
                });
            }

            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        console.log('You are adding a friend!');
        console.log(req.body);

        try {
            const users = await user.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { freinds: req.body } },
                { runValidators: true, new: true }
            );

            if (!users) {
                return res.status(404).json({ message: 'No user found with that ID :(' });
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const users = await user.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { freinds: { freindsId: req.params.freindsId } } },
                { runValidators: true, new: true }
            );

            if (!users) {
                return res.status(404).json({ message: 'No user found with that ID :(' });
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
