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

  useEffect(() => {
    if (!workout) {
      history.push('/add-workout');
      setAlert('Please name this workout first', 'danger');
    }
  }, []);

  // Workout Name Editable Dependencies
  const workoutRef = useRef();
  const [workoutName, setWorkoutName] = useState('');
  useEffect(() => {
    if (!workout) return;
    setWorkoutName(workout.workoutName);
  }, [workout]);

  const handleChangeName = () => {
    addExercise(workout._id, { workoutName: workoutName });
  };

  // Adding Exercises
  const [exercise, setExercise] = useState([]);
  const { exerciseName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!workout) return;
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

  return (
    <Fragment>
      <Editable
        text={workoutName}
        placeholder='Write an workout name'
        childRef={workoutRef}
        type='input'
        handleChangeName={handleChangeName}
        smallLetters={false}
      >
        <input
          ref={workoutRef}
          type='text'
          name='workoutName'
          className='shadow text-4xl font-semibold appearance-none w-full md:w-1/2 p-1 text-gray-600 leading-tight rounded-lg border-2 border-indigo-400 outline-none focus:border-indigo-500'
          placeholder='Type the name of your workout'
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
      </Editable>
      <h2 className='text-xl text-center md:text-left mb-5'>
        Workout being performed on{' '}
        {workout && format(new Date(workout.date), 'yyyy/MM/dd')}
      </h2>
      <form
        className='flex flex-col items-center gap-y-3 md:flex-row w-full md:gap-x-5'
        onSubmit={(e) => {
          e.preventDefault();
          addExercise(workout._id, formData);
        }}
      >
        <input
          type='text'
          className='w-5/6  md:w-1/4 p-1 rounded-lg border-2 border-indigo-400 outline-none focus:border-indigo-500'
          placeholder='Add an Exercise to this Workout'
          name='exerciseName'
          value={exerciseName}
          onChange={onChange}
          required
        />
        <button
          type='submit'
          className='flex items-center w-1/3 md:w-1/6  max-w-xs cursor-pointer bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg p-1 font-semibold'
        >
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>{' '}
          Add Exercise
        </button>
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
