// The api/users/ endpoint

const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

module.exports = router;

// IDK how to do this part
// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list