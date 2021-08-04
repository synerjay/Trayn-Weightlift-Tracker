const express = require('express');
const router = express.Router();
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
    // const { weight, reps } = req.body;
    // req.body should be an array of objects already

    // Build workout object
    // const newSet = {};
    // newSet.weight = weight;
    // newSet.reps = reps;

    //Try and catch error to find profile using id from req.user (token)
    try {
      const workout = await Workout.findOne({ _id: req.params.workout_id });
      const exerciseIndex = workout.exercise.findIndex(
        (element) => element._id == req.params.exercise_id // non-Strict equal sign because id is a number while the exercise id is a string
      );
      // workout.exercise[exerciseIndex].sets.push(newSet);
      workout.exercise[exerciseIndex].sets = req.body;
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

// @router  GET api/workout/:id
// @desc    Get one workout by ID
// @access  Private

router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // If post id doesnt exist, then send 404 error
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @router  DELETE api/workout/:id
// @desc    Deleting a workout
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // If workout id doesnt exist, then send 404 error
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    // make sure the one deleting the workout is the one that owns the workout

    // Check user

    if (workout.user.toString() !== req.user.id) {
      // we need to convert workout.user.id to string to match req.user.id because originally it is an object user value in the workout schema
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await workout.remove();

    res.json({ msg: 'Workout removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @router  DELETE api/workout/:id/:exercise_id
// @desc    Deleting an exercise
// @access  Private

router.delete('/:id/:exercise_id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // If workout id doesnt exist, then send 404 error
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    const exercise = workout.exercise.find(
      (exercise) => exercise.id === req.params.exercise_id
    );

    //Make sure comment exists
    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise does not exist' });
    }

    //Get remove index
    const removeIndex = workout.exercise
      .map((item) => item.id)
      .indexOf(req.params.exercise_id);

    workout.exercise.splice(removeIndex, 1);

    await workout.save();

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router  DELETE api/workout/:id/:exercise_id
// @desc    Deleting an exercise
// @access  Private

router.delete('/:id/:exercise_id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // If workout id doesnt exist, then send 404 error
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    //Pull out comment
    const exercise = workout.exercise.find(
      (exercise) => exercise.id === req.params.exercise_id
    );

    //Make sure comment exists
    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise does not exist' });
    }

    //Get remove index
    const removeIndex = workout.exercise
      .map((item) => item.id)
      .indexOf(req.params.exercise_id);

    workout.exercise.splice(removeIndex, 1);

    await workout.save();

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router  DELETE api/workout/:id/:exercise_id/:set_id
// @desc    Deleting an exercise
// @access  Private

router.delete('/:id/:exercise_id/:set_id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // If workout id doesnt exist, then send 404 error
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }

    const exercise = workout.exercise.find(
      (exercise) => exercise.id === req.params.exercise_id
    );

    //Make sure comment exists
    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise does not exist' });
    }

    //Get remove index
    const exerciseIndex = workout.exercise
      .map((item) => item.id)
      .indexOf(req.params.exercise_id);

    const set = workout.exercise[exerciseIndex].sets.find(
      (set) => set.id === req.params.set_id
    );

    if (!set) {
      return res.status(404).json({ msg: 'Set does not exist' });
    }

    const removeIndex = workout.exercise[exerciseIndex].sets
      .map((item) => item.id)
      .indexOf(req.params.set_id);

    workout.exercise[exerciseIndex].sets.splice(removeIndex, 1);

    await workout.save();

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
