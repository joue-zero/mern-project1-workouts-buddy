const express = require('express');
const router = express.Router();

const workoutController = require('../controllers/workoutController');

router.get('/', workoutController.getAllWorkouts);

router.get('/:workoutId', workoutController.getWorkoutById);

router.post('/', workoutController.postCreateWorkout);

router.delete('/:id', workoutController.deleteWorkout);


router.patch('/:id', workoutController.patchWorkout);

module.exports = router;