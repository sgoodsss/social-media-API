const { User, Thought } = require('../models');

module.exports = {
    // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("thoughts").populate("friends");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // GET a single user by its _id and populated thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v').populate("thoughts").populate("friends");

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // POST a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // PUT to update a user by its _id
    async updateUser(req, res) {
      try {
        const updatedUser = await User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body}, {runValidators: true, new: true})
        res.json(updatedUser)
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // DELETE to remove a user by its _id
    async deleteUser(req, res) {
      try {
        const deleteUser = await User.findOneAndDelete({_id: req.params.userId})
        await Thought.deleteMany({_id: {$in: deleteUser.thoughts}})
        res.json(deleteUser)
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // POST to add a new friend to a user's friend list
    async addFriend(req, res) {
      try {
        const userData = await User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {new: true})
        res.json(userData)
      } catch (err) {
        res.status(500).json(err);
      }
    },


// DELETE to remove a friend from a user's friend list
    async deleteFriend(req, res) {
      try {
        const userData = await User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
        res.json(userData)
      } catch (err) {
        res.status(500).json(err);
      }
    }

};
