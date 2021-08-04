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
    <div className='post bg-white p-1 my-1'>
      <p className='my-1'>{name}</p>
      <button
        onClick={() => deleteExercise(workoutId, _id)}
        type='button'
        className='btn btn-danger'
      >
        DELETE
      </button>
    </div>
  );
};

ExerciseItem.propTypes = {
  deleteExercise: PropTypes.func.isRequired,
};

export default connect(null, { deleteExercise })(ExerciseItem);
