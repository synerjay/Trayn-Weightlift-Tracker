import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getWorkout } from '../../actions/workout';
import { Link } from 'react-router-dom';
import ExerciseProfile from './ExerciseProfile';

const WorkoutProfile = ({
  getWorkout,
  workout: { workout, loading },
  workoutId,
  setWorkoutHeader,
}) => {
  useEffect(() => {
    getWorkout(workoutId); // in react, we get the params by accessing the match object from the props
  }, [getWorkout, workoutId]);

  useEffect(() => {
    setWorkoutHeader(workout);
  }, [workout]);

  return (
    <>
      {workout === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <div className='w-full flex flex-col md:grid md:grid-cols-2 md:gap-5 p-1 -mt-6'>
            {workout.exercise.map((exercise) => (
              <ExerciseProfile key={exercise._id} exercise={exercise} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  workout: state.workout,
});

export default connect(mapStateToProps, { getWorkout })(WorkoutProfile);
