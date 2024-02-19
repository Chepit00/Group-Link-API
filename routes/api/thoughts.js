const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    newThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController.js');

//gets all thoughts, creates new thought 
router.route('/').get(getThoughts).post(newThought);

//get a single thought by ID, updates a thought via ID, deletes thought by ID
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

//create a reaction, delete a reaction via reactionID
router.route('/:thoughtId/reactions/:reactionId').post(createReaction).delete(deleteReaction);

module.exports = router;