const express = require('express');
const config = require('config');
const router = express.Router();
const axios = require('axios');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Workout = require('../../models/Workout');

// Testing for adding a workout
// @route POST api/workout/
// @desc Add WORKOUT session
// @access Private

router.post(
  '/',
  [
    auth,
    // [
    //   // check('title', 'Title is required').not().isEmpty(),
    //   // check('company', 'Company is required').not().isEmpty(),
    //   // check('from', 'From date is required').not().isEmpty(),
    // ],
  ],
  async (req, res) => {
    //Check to see if there errors in fields not filling in
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Next step is to deconstruct the req.body to pull out the information in the request

    const { workoutName } = req.body;

    // Build workout object
    const workoutFields = {};
    workoutFields.user = req.user.id;
    if (workoutName) workoutFields.workoutName = workoutName;

    //Try and catch error to find profile using id from req.user (token)

    try {
      workout = new Workout(workoutFields);

      await workout.save();
      res.json(workout);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Testing for Adding an Exercise
// @route POST api/workout/:workout_id
// @desc Add WORKOUT session
// @access Private

router.put(
  '/:workout_id',
  [
    auth,
    // [
    //   // check('title', 'Title is required').not().isEmpty(),
    //   // check('company', 'Company is required').not().isEmpty(),
    //   // check('from', 'From date is required').not().isEmpty(),
    // ],
  ],
  async (req, res) => {
    //Check to see if there errors in fields not filling in
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Next step is to deconstruct the req.body to pull out the information in the request
    const { exerciseName } = req.body;

    // Build workout object
    const newExercise = {};
    newExercise.name = exerciseName;

    //Try and catch error to find profile using id from req.user (token)
    try {
      const workout = await Workout.findOne({ _id: req.params.workout_id });
      workout.exercise.push(newExercise);
      await workout.save();
      res.json(workout);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Testing for Adding a SET to an Exercise
// @route POST api/workout/:workout_id/:exercise_id
// @desc Add WORKOUT session
// @access Private

router.put(
  '/:workout_id/:exercise_id',
  [
    auth,
    // [
    //   // check('title', 'Title is required').not().isEmpty(),
    //   // check('company', 'Company is required').not().isEmpty(),
    //   // check('from', 'From date is required').not().isEmpty(),
    // ],
  ],
  async (req, res) => {
    //Check to see if there errors in fields not filling in
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Next step is to deconstruct the req.body to pull out the information in the request
    const { weight, reps } = req.body;

    // Build workout object
    const newSet = {};
    newSet.weight = weight;
    newSet.reps = reps;

    //Try and catch error to find profile using id from req.user (token)
    try {
      const workout = await Workout.findOne({ _id: req.params.workout_id });
      const exerciseIndex = workout.exercise.findIndex(
        (element) => element._id == req.params.exercise_id // non-Strict equal sign because id is a number while the exercise id is a string
      );
      workout.exercise[exerciseIndex].sets.push(newSet);
      await workout.save();
      res.json(workout);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @router  GET api/workout
// @desc    Get all Workout Sessions
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const workoutSessions = await Workout.find({ user: req.user.id }).sort({
      date: -1,
    }); // -1 means the most recent. Most oldest is date: 1 which is the default

    res.json(workoutSessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
