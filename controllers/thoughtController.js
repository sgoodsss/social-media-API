const { User, Thought } = require('../models');

module.exports = {
  // GET to get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a new thought
  // (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }

      res.json('Created your thought! 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created but no user with this id!' });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // /api/thoughts/:thoughtId/reactions
  // POST to create a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { reactions: req.params.reactionId } }, { new: true })
      res.json(thoughtData)
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.userId }, { $pull: { reactions: req.params.reactionId } }, { new: true })
      res.json(thoughtData)
    } catch (err) {
      res.status(500).json(err);
    }
  }

};
