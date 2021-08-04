import React from 'react';

const SetItem = ({ element, index, handleChange, removeFormFields }) => {
  return (
    <div className='form-inline' key={index}>
      <label>Set {index + 1}</label>
      <label>Weight</label>
      <input
        type='text'
        name='weight'
        value={element.weight || ''}
        onChange={(e) => handleChange(index, e)}
      />
      <label>Reps</label>
      <input
        type='text'
        name='reps'
        value={element.reps || ''}
        onChange={(e) => handleChange(index, e)}
      />
      {index ? (
        <button
          type='button'
          className='button remove'
          onClick={() => removeFormFields(index)}
        >
          Remove
        </button>
      ) : null}
    </div>
  );
};

export default SetItem;
