import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExercise } from '../../actions/workout';
import { addSet } from '../../actions/workout';
import SetItem from './SetItem';

const ExerciseItem = ({
  workoutId,
  exercise: { _id, name },
  deleteExercise,
  addSet,
}) => {
  const [formValues, setFormValues] = useState([{ weight: '', reps: '' }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = parseInt(e.target.value); // backend expects integers not strings so parseInt is used
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { weight: '', reps: '' }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    addSet(workoutId, _id, formValues);
  };

  return (
    <div className='bg-white mb-5 w-4/5  p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500'>
      <h1 className='text-2xl text-gray-800 font-semibold mb-3'>{name}</h1>
      <form onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <SetItem
            element={element}
            index={index}
            handleChange={handleChange}
            removeFormFields={removeFormFields}
          />
        ))}
        <div className='button-section'>
          <button
            className='button add'
            type='button'
            onClick={() => addFormFields()}
          >
            Add Set
          </button>
          <button className='button submit' type='submit'>
            Save
          </button>
        </div>
      </form>
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
  );
};

ExerciseItem.propTypes = {
  deleteExercise: PropTypes.func.isRequired,
  addSet: PropTypes.func.isRequired,
};

export default connect(null, { deleteExercise, addSet })(ExerciseItem);
