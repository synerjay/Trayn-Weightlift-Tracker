import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWorkout, deleteWorkout } from '../../actions/workout';
import { Link } from 'react-router-dom';
import ExerciseProfile from './ExerciseProfile';
import ReactLoading from 'react-loading';

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
        <div className='w-full h-screen flex justify-center mt-32 md:mt-36 '>
          <ReactLoading type='spin' color='#312E81' width={300} />
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <div className='w-full flex flex-col md:grid md:grid-cols-2 md:gap-5 p-1 -mt-6'>
            {workout.exercise.map((exercise) => (
              <ExerciseProfile key={exercise._id} exercise={exercise} />
            ))}
          </div>
          <button
            className='flex justify-center items-center mt-2 md:mb-0 bg-red-600 md:py-3 px-2 py-0 h-12 w-36 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-700'
            onClick={() => handleDelete()}
          >
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
