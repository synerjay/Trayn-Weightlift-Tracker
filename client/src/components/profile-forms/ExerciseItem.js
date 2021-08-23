import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExercise } from '../../actions/workout';
import { addSet } from '../../actions/workout';
import SetItem from './SetItem';
import Editable from '../layout/Editable';

const ExerciseItem = ({
  workoutId,
  exercise: { _id, name, sets },
  deleteExercise,
  addSet,
}) => {
  const [formValues, setFormValues] = useState([{ weight: '', reps: '' }]);
  const [saveAll, setSaveAll] = useState(false);

  // Exercise Name Editable Dependencies
  const exerciseRef = useRef();
  const [exerciseName, setExerciseName] = useState('');
  useEffect(() => {
    setExerciseName(name);
  }, [name]);

  const handleChangeName = () => {
    addSet(workoutId, _id, { exerciseName: exerciseName });
  };

  useEffect(() => {
    if (sets && sets.length !== 0) {
      setFormValues(
        sets.map((set) => ({ weight: set.weight, reps: set.reps }))
      );
    }
  }, []);

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

  const handleSaveAll = (event) => {
    setSaveAll(true);
    handleSubmit(event);
  };

  return (
    <div className='bg-gray-100 mb-5 w-full  p-8 rounded-lg shadow-lg relative hover:shadow-2xl transition duration-500'>
      <Editable
        text={exerciseName}
        placeholder='Write an workout name'
        childRef={exerciseRef}
        type='input'
        smallLetters={true}
        handleChangeName={handleChangeName}
      >
        <input
          ref={exerciseRef}
          type='text'
          name='exerciseName'
          className='shadow text-2xl font-semibold appearance-none w-full md:w-1/2 p-1 text-gray-600 leading-tight rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
          placeholder='Type the name of your workout'
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        />
      </Editable>

      <table className='WorkoutTable'>
        <thead>
          <tr className='shadow-md'>
            <th className='md:w-5 w-10 text-center'>Set</th>
            <th className='md:w-32 w-36  text-center'>Kg</th>
            <th className='md:w-32 w-36 text-center'>Reps</th>
            <th className='md:w-5 w-10 ' />
            <th className='md:w-5 w-10' />
          </tr>
        </thead>
        <tbody>
          {formValues.map((element, index) => (
            <SetItem
              key={index}
              element={element}
              index={index}
              handleChange={handleChange}
              removeFormFields={removeFormFields}
              handleSubmit={handleSubmit}
              deleteExercise={deleteExercise}
              workoutId={workoutId}
              id={_id}
              saveAll={saveAll}
            />
          ))}
        </tbody>
      </table>
      <div className='flex flex-col gap-y-5'>
        <button
          className='w-full h-5 bg-gray-300 flex justify-center items-center max-w-xs mx-auto hover:bg-gray-200 focus:bg-gray-200 focus:border-indigo-500 focus:outline-none text-gray-600 rounded-lg p-1 text-sm font-semibold'
          type='button'
          onClick={() => addFormFields()}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-3 w-3 mt-0 mr-2'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>{' '}
          ADD ONE MORE SET
        </button>
        <button
          className='w-1/2 md:w-1/3  h-5 bg-indigo-900 flex justify-center items-center max-w-xs mx-auto hover:bg-indigo-700 focus:bg-indigo-700 text-white text-sm rounded-lg p-1 font-semibold'
          onClick={(event) => handleSaveAll(event)}
          type='submit'
        >
          SAVE ALL SETS
        </button>
      </div>
      <div>
        <button
          onClick={() => deleteExercise(workoutId, _id)}
          type='button'
          className='absolute h-10 w-10 p-0 text-2xl flex justify-center items-center text-white top-0 right-0 bg-indigo-800 rounded-3xl transform translate-x-2 -translate-y-3 shadow-xl'
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
