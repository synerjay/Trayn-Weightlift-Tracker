import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWorkout } from '../../actions/workout';

const AddWorkout = ({ addWorkout, history }) => {
  const [formData, setFormData] = useState({
    workoutName: '',
  });

  const { workoutName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClick = (event) => {
    console.log(event.target.innerText);
    addWorkout({ [event.target.name]: event.target.innerText }, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Workout</h1>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addWorkout(formData, history);
        }}
      >
        {' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Choose a Workout Name'
            name='workoutName'
            value={workoutName}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
      </form>
      <button
        name='workoutName'
        onClick={(event) => handleClick(event)}
        className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
      >
        Push (Chest, Shoulders, Triceps)
      </button>
      <button
        name='workoutName'
        onClick={(event) => handleClick(event)}
        className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
      >
        Pull (Back, Biceps, Lats)
      </button>
      <button
        name='workoutName'
        onClick={(event) => handleClick(event)}
        className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
      >
        Legs
      </button>
      <button
        name='workoutName'
        onClick={(event) => handleClick(event)}
        className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
      >
        Custom Workout
      </button>
    </Fragment>
  );
};

AddWorkout.propTypes = {
  addWorkout: PropTypes.func.isRequired,
};

export default connect(null, { addWorkout })(AddWorkout);

{
  /* <button
        onClick={() => handleClick(workout._id)}
        className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
      >
      //  Content here
      </button> */
}
