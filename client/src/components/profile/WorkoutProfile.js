import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getWorkout, deleteWorkout } from '../../actions/workout';
import { Link } from 'react-router-dom';
import ExerciseProfile from './ExerciseProfile';

const WorkoutProfile = ({
  getWorkout,
  workout: { workout, loading },
  workoutId,
  setWorkoutHeader,
  deleteWorkout,
  setShowModal,
}) => {
  useEffect(() => {
    getWorkout(workoutId); // in react, we get the params by accessing the match object from the props
  }, [getWorkout, workoutId]);

  useEffect(() => {
    setWorkoutHeader(workout);
  }, [workout]);

  const handleDelete = () => {
    setShowModal(false);
    deleteWorkout(workoutId);
  };

  return (
    <>
      {workout === null || loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col items-center'>
          <div className='w-full flex flex-col md:grid md:grid-cols-2 md:gap-5 p-1 -mt-6'>
            {workout.exercise.map((exercise) => (
              <ExerciseProfile key={exercise._id} exercise={exercise} />
            ))}
          </div>
          <button
            className='flex w-1/4   items-center mt-2 md:mb-0 bg-red-600 md:px-6 md:py-2 px-10  h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-700'
            onClick={() => handleDelete()}
          >
            {' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
            Delete Workout
          </button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  workout: state.workout,
});

export default connect(mapStateToProps, { getWorkout, deleteWorkout })(
  WorkoutProfile
);
