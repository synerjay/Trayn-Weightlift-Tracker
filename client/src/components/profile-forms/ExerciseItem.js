import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExercise } from '../../actions/workout';

const ExerciseItem = ({
  workoutId,
  exercise: { _id, name, sets },
  deleteExercise,
}) => {
  return (
    // <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
    //   <div className='containter mx-auto px-20'>
    <div className='bg-white mb-5 w-3/5   p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500'>
      <h1 className='text-2xl text-gray-800 font-semibold mb-3'>{name}</h1>
      <p className='text-gray-600 leading-6 tracking-normal'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae itaque
        debitis saepe, eaque similique quo doloribus ducimus ex veniam accusamus
        aliquid esse, veritatis totam quia impedit tempore aperiam, doloremque
        eius.
      </p>
      <button className='p-4 mt-8 bg-indigo-600 text-white rounded-md shadow-xl'>
        Add a set
      </button>
      <div>
        <button
          onClick={() => deleteExercise(workoutId, _id)}
          type='button'
          className='absolute p-4 text-sm text-white top-0 right-0 bg-red-600 rounded-md transform translate-x-2 -translate-y-3 shadow-xl'
        >
          {' '}
          DELETE
        </button>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

ExerciseItem.propTypes = {
  deleteExercise: PropTypes.func.isRequired,
};

export default connect(null, { deleteExercise })(ExerciseItem);

{
  /* <div className='post bg-white p-1 my-1'>
  <p className='my-1'>{name}</p>
  <button
    onClick={() => deleteExercise(workoutId, _id)}
    type='button'
    className='w-16 bg-red-600 text-white'
  >
    DELETE
  </button>
</div>; */
}
