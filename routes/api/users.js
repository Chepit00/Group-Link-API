const router = require("express").Router();

//Importing methods 
const {
  getUsers,
  createUser,
  getSingleUsers,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController.js");

//gets all users, post a new user
router.route('/').get(getUsers).post(createUser);

//gets single user by its Id and data, put used to update a user via Id, delete a user via Id
router.route('/:userId').get(getSingleUsers).put(updateUser).delete(deleteUser);

//adding friend to users friend list, also remove a friend from list 
router.route('/:userId/friends/:friendsId').post(addFriend).delete(removeFriend);

module.exports = router;