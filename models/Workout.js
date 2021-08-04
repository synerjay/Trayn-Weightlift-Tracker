const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  // setNumber: { type: Number },
  weight: { type: Number },
  reps: { type: Number },
});

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  sets: [setSchema],
});

const WorkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  workoutName: { type: String },
  date: { type: Date, default: Date.now },
  exercise: [exerciseSchema],
});

module.exports = Workout = mongoose.model('workout', WorkoutSchema);
