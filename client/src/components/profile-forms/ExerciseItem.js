import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExercise } from '../../actions/workout';
import SetItem from './SetItem';

const ExerciseItem = ({
  workoutId,
  exercise: { _id, name, sets },
  deleteExercise,
}) => {
  const [formValues, setFormValues] = useState([{ weight: '', reps: '' }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
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
    // alert(JSON.stringify(formValues));
  };

  return (
    <div className='bg-white mb-5 w-3/5   p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500'>
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
            Add
          </button>
          <button className='button submit' type='submit'>
            Submit
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
