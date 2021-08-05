import React, { Fragment } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteWorkout } from '../../actions/workout';

const Workout = ({ workouts, deleteWorkout }) => {
  const workoutList = workouts.map((workout) => (
    <tr key={workout._id}>
      <td>{workout.workoutName}</td>
      <td className='hide-sm'>
        {format(new Date(workout.date), 'yyyy/MM/dd')}
      </td>
      <td>
        {workout.exercise.slice(0, 4).map((item) => (
          <p>{item.name}</p>
        ))}
        ...
      </td>
      <td>
        <button
          onClick={() => deleteWorkout(workout._id)}
          className='btn btn-danger'
        >
          {' '}
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Your Past Workouts</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Workout</th>
            <th className='hide-sm'>Date</th>
            <th className='hide-sm'>Exercises</th>
            <th />
          </tr>
        </thead>
        <tbody>{workoutList}</tbody>
      </table>
    </Fragment>
  );
};

Workout.propTypes = {
  deleteWorkout: PropTypes.func.isRequired,
  workout: PropTypes.array.isRequired,
};

export default connect(null, { deleteWorkout })(Workout);
