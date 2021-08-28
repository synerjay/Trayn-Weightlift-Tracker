import React, { Fragment, useEffect, useState } from 'react';

const SetItem = ({
  element,
  index,
  handleChange,
  removeFormFields,
  deleteExercise,
  workoutId,
  handleSubmit,
  id,
  saveAll,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const buttonClicked = (event) => {
    setSubmitted(!submitted);
    handleSubmit(event);
  };

  return (
    <tr className={submitted || saveAll ? 'bg-green-100' : null} key={index}>
      {/* form starts here */}
      <td>{index + 1}</td>
      <td>
        <input
          type='text'
          className='w-2/3 -ml-0 pl-2 rounded-lg border-2 bg-white border-black outline-none focus:border-indigo-500'
          name='weight'
          value={element.weight || ''}
          onChange={(e) => handleChange(index, e)}
        />
      </td>
      <td>
        <input
          type='text'
          className='w-2/3 pl-2 rounded-lg border-2 bg-white border-black outline-none focus:border-indigo-500'
          name='reps'
          value={element.reps || ''}
          onChange={(e) => handleChange(index, e)}
        />
      </td>
      <td>
        <button type='submit' onClick={(event) => buttonClicked(event)}>
          {' '}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={
              'h-6 w-6 ' +
              (submitted || saveAll ? 'text-green-600' : 'text-gray-600')
            }
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' />
            <path
              fillRule='evenodd'
              d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </td>

      {/* Put form end here */}
      <td>
        {index ? (
          <button
            type='button'
            // className='button remove'
            onClick={() => removeFormFields(index)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-red-600'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        ) : (
          <button
            type='button'
            // className='button remove'
            onClick={() => deleteExercise(workoutId, id)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-red-600'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        )}
      </td>
    </tr>
  );
};

export default SetItem;
