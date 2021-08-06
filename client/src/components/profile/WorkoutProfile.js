import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getWorkout } from '../../actions/workout';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ExerciseProfile from './ExerciseProfile';

const WorkoutProfile = ({
  getWorkout,
  workout: { workout, loading },
  workoutId,
}) => {
  useEffect(() => {
    getWorkout(workoutId); // in react, we get the params by accessing the match object from the props
  }, [getWorkout, workoutId]);

  return (
    <>
      {workout === null || loading ? (
        <Spinner />
      ) : (
        <div>
          <h2 className='text-3xl'> {workout.workoutName}</h2>
          <p className='text-lg'>
            {' '}
            Workout performed on {format(new Date(workout.date), 'yyyy/MM/dd')}
          </p>
          <div className='w-full flex flex-col md:grid md:grid-cols-2 md:gap-5 p-5'>
            {workout.exercise.map((exercise) => (
              <ExerciseProfile key={exercise._id} exercise={exercise} />
            ))}
          </div>
          <Link className='btn btn-light my-1' to='/add-exercise'>
            Edit Workout
          </Link>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  workout: state.workout,
});

export default connect(mapStateToProps, { getWorkout })(WorkoutProfile);
