import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getWorkout } from '../../actions/workout';
import { Link } from 'react-router-dom';

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
          <h2> The Workout is {workout.workoutName}</h2>
          <h2> The id is {workout._id}</h2>
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
