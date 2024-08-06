const mongoose = require('mongoose');
const Workout = require('../models/Workout');

exports.getAllWorkouts = async (req, res, next) => {
    try {
        const workouts = await Workout.find().sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
exports.getWorkoutById = async (req, res, next) => {
    const workoutId = req.params.workoutId;
    if (!mongoose.Types.ObjectId.isValid(workoutId))
        return res.status(400).json({message: 'Workout not found!'});
    const workout = await Workout.findById(workoutId);
    if (workout) {
        return res.status(200).json(workout);
    }
    return res.status(404).json({message: 'Workout not found!'});
};
exports.postCreateWorkout = (req, res, next) => {
    const {title, reps, load} = req.body;
    Workout.create({title, load, reps})
        .then((result) => {
            res.status(200).json({
                message: 'Workout saved!',
                workout: result
            });
        })
        .catch((error) => {
            res.status(404).json({message: error.message});
        });
};
exports.deleteWorkout = async (req, res, next) => {
    const workoutId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(workoutId))
        return res.status(400).json({message: 'Workout not found!'});
    const workout = await Workout.findByIdAndDelete(workoutId);
    if (workout) {
        return res.status(200).json({message: 'Workout deleted!'});
    }
    return res.status(404).json({message: 'Workout not found!'});
}
exports.patchWorkout = async (req, res, next) => {
    const workoutId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(workoutId))
        return res.status(400).json({message: 'Workout not found!'});
    const workout = await Workout.findByIdAndUpdate(workoutId, req.body, {new: true});
    if (workout) {
        return res.status(200).json({message: 'Workout updated!', workout});
    }
    return res.status(404).json({message: 'Workout not found!'});
}