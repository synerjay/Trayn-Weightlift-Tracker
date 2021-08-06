import React, { Fragment } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteWorkout } from '../../actions/workout';

const Workout = ({ workouts, deleteWorkout, setWorkoutId, showModal }) => {
  const handleClick = (id) => {
    setWorkoutId(id);
    showModal(true);
  };

  const workoutList = workouts.map((workout) => (
    <tr key={workout._id}>
      <button
        onClick={() => handleClick(workout._id)}
        className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5'
      >
        <td className='w-36 '>{workout.workoutName}</td>
        <td className='w-28 '>
          {format(new Date(workout.date), 'yyyy/MM/dd')}
        </td>
        <td className='w-40 '>
          {workout.exercise.slice(0, 1).map((item) => (
            <Fragment>{item.name}, </Fragment>
          ))}
          etc...
        </td>
      </button>
      <td>
        <button onClick={() => deleteWorkout(workout._id)}>
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='text-red-700 h-5 w-5 ml-5'
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
      <table className=' w-1/2 my-2'>
        <thead>
          <tr>
            <th className='w-full'> Your Workout History </th>
            {/* <th className='w-32'>Date</th>
            <th className='w-80'>Exercises</th> */}
            <th className='w-5 ml-2' />
          </tr>
        </thead>
        <tbody>{workoutList}</tbody>
      </table>
    </Fragment>
  );
};

Workout.propTypes = {
  deleteWorkout: PropTypes.func.isRequired,
  workouts: PropTypes.array.isRequired,
};

export default connect(null, { deleteWorkout })(Workout);
