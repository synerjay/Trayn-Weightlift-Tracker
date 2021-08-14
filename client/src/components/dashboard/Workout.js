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
    <tr key={workout._id} class='bg-white shadow-lg'>
      <td class='p-1'>
        <div class='flex align-items-center'>
          <div class='ml-3'>
            <div class=''>{workout.workoutName}</div>
          </div>
        </div>
      </td>
      <td class='p-1'>{format(new Date(workout.date), 'yyyy/MM/dd')}</td>
      <td class='p-1 font-bold'>
        {workout.exercise.slice(0, 2).map((item) => (
          <Fragment>{item.name}, </Fragment>
        ))}{' '}
        etc...
      </td>
      <td class='p-1'>
        <span
          className={
            'text-gray-50 rounded-md px-2 ' +
            (workout.exercise.length < 3 ? 'bg-red-400' : 'bg-green-400')
          }
        >
          {workout.exercise.length}
        </span>
      </td>
      <td class='p-0 md:space-y-0 justify-center align-items space-x-5'>
        <button
          onClick={() => handleClick(workout._id)}
          class='text-gray-400 hover:text-gray-600 mr-1'
        >
          <i class='material-icons-outlined text-base'>visibility</i>
        </button>
        <button
          onClick={() => deleteWorkout(workout._id)}
          class='text-red-400 hover:text-red-600  ml-1'
        >
          <i class='material-icons-round text-base'>delete_outline</i>
        </button>
      </td>
    </tr>
  ));

  return (
    <div class='mt-2 w-full col-span-12'>
      <div class='overflow-auto lg:overflow-visible '>
        <table class='table w-full text-gray-400 border-separate space-y-6 text-sm'>
          <thead class='bg-white shadow-lg text-gray-500'>
            <tr className='text-indigo-600'>
              <th class='p-1'>Workout</th>
              <th class='p-1 text-left'>Date</th>
              <th class='p-1 text-left'>Exercises</th>
              <th class='p-1 text-left'>Status</th>
              <th class='p-1 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>{workoutList}</tbody>
        </table>
      </div>
    </div>
  );
};

Workout.propTypes = {
  deleteWorkout: PropTypes.func.isRequired,
  workouts: PropTypes.array.isRequired,
};

export default connect(null, { deleteWorkout })(Workout);

{
  /* <Fragment>
      <table className='w-full my-2'>
        <thead>
          <tr>
            <th className='w-full'> Your Workouts </th>
            {/* <th className='w-32'>Date</th>
            <th className='w-80'>Exercises</th> */
}
//         <th className='w-5 ml-2' />
//       </tr>
//     </thead>
//     <tbody>{workoutList}</tbody>
//   </table>
// </Fragment>

// const workoutList = workouts.map((workout) => (
//   <tr key={workout._id}>
//     <button
//       onClick={() => handleClick(workout._id)}
//       className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
//     >
//       <td className='w-56 '>{workout.workoutName}</td>
//       <td className='w-28 '>
//         {format(new Date(workout.date), 'yyyy/MM/dd')}
//       </td>
//       <td className='w-40 '>
//         {workout.exercise.slice(0, 1).map((item) => (
//           <Fragment>{item.name}, </Fragment>
//         ))}
//         etc...
//       </td>
//     </button>
//     <td>
//       <button onClick={() => deleteWorkout(workout._id)}>
//         {' '}
//         <svg
//           xmlns='http://www.w3.org/2000/svg'
//           className='text-red-700 h-5 w-5 ml-5'
//           viewBox='0 0 20 20'
//           fill='currentColor'
//         >
//           <path
//             fillRule='evenodd'
//             d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
//             clipRule='evenodd'
//           />
//         </svg>
//       </button>
//     </td>
//   </tr>
// ));
