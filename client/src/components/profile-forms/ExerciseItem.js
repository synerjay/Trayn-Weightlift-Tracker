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
    <div className='bg-white mb-5 w-full  p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500'>
      <h1 className='text-2xl text-gray-800 font-semibold mb-3'>{name}</h1>
      <form onSubmit={handleSubmit}>
        <table className='table'>
          <thead>
            <tr>
              <th className='w-5 text-center'>Set</th>
              <th className='w-32 text-center'>Weight</th>
              <th className='w-32 text-center'>Reps</th>
              <th className='5' />
              <th className='5' />
            </tr>
          </thead>
          <tbody>
            {formValues.map((element, index) => (
              <SetItem
                element={element}
                index={index}
                handleChange={handleChange}
                removeFormFields={removeFormFields}
                deleteExercise={deleteExercise}
                workoutId={workoutId}
                id={_id}
              />
            ))}
          </tbody>
        </table>
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
          className='absolute p-4 text-sm text-white top-0 right-0 bg-red-600 rounded-3xl transform translate-x-2 -translate-y-3 shadow-xl'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-white'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
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
