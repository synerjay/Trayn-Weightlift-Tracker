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
        {workout.exercise.slice(0, 5).map((item) => (
          <Fragment>{item.name}, </Fragment>
        ))}
        etc.
      </td>
      <td>
        <button
          onClick={() => deleteWorkout(workout._id)}
          // className='btn btn-danger'
        >
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='text-red-700 h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
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
            <th className='w-44'>Workout</th>
            <th className='w-32'>Date</th>
            <th className='w-80'>Exercises</th>
            <th className='5' />
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
