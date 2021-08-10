import React, { Fragment, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExercise } from '../../actions/workout';
import ExerciseItem from './ExerciseItem';
import { setAlert } from '../../actions/alert';
import { format } from 'date-fns';
import { pushExercises } from '../../utils/exerciseData';
import { pullExercises } from '../../utils/exerciseData';
import { legExercises } from '../../utils/exerciseData';
import { customExercises } from '../../utils/exerciseData';
import Editable from '../layout/Editable';

const AddExercise = ({ workout: { workout }, addExercise, history }) => {
  const [formData, setFormData] = useState({
    exerciseName: '',
  });

  // Workout Name Editable Dependencies
  const inputRef = useRef();
  const [workoutName, setWorkoutName] = useState('');

  // Adding Exercises
  const [exercise, setExercise] = useState([]);
  const { exerciseName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!workout) {
      history.push('/add-workout');
      setAlert('Please name this workout first', 'danger');
    }
  }, []);

  useEffect(() => {
    if (workout.exercise.length !== 0) {
      setExercise([...workout.exercise]);
    } else {
      switch (workout.workoutName) {
        case 'Push (Chest, Shoulders, Triceps)':
          addExercise(workout._id, pushExercises);
          break;
        case 'Pull (Back, Biceps, Lats)':
          addExercise(workout._id, pullExercises);
          break;
        case 'Legs':
          addExercise(workout._id, legExercises);
        default:
          addExercise(workout._id, customExercises);
      }
    }
  }, [workout]);

  useEffect(() => {
    setWorkoutName(workout.workoutName);
  }, [workout]);

  return (
    <Fragment>
      {/* Start of Editable area */}
      <Editable
        text={workoutName}
        placeholder='Write a task name'
        childRef={inputRef}
        type='input'
      >
        <input
          ref={inputRef}
          type='text'
          name='workoutName'
          className='shadow text-4xl appearance-none border rounded w-1/2 py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300'
          placeholder='Type the name of your workout'
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
      </Editable>
      {/* End of Editable area */}
      {/* <h1 className='large text-primary'>{workout && workout.workoutName}</h1> */}
      <h2 className='text-xl'>
        Workout being performed on{' '}
        {workout && format(new Date(workout.date), 'yyyy/MM/dd')}
      </h2>
      <h2> Add an exercise to this workout:</h2>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addExercise(workout._id, formData);
        }}
      >
        {' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Add an Exercise'
            name='exerciseName'
            value={exerciseName}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary my-1'
          value='Add Exercise'
        />
      </form>
      <div className='w-full flex flex-col md:grid md:grid-cols-2 md:gap-5 p-5'>
        {exercise.map((exercise) => (
          <ExerciseItem
            key={exercise._id}
            exercise={exercise}
            workoutId={workout._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  workout: state.workout,
});

export default connect(mapStateToProps, { addExercise })(AddExercise);
