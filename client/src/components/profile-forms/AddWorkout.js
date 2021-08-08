import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWorkout } from '../../actions/workout';
import AddWorkoutModal from '../layout/AddWorkoutModal';

const AddWorkout = ({ addWorkout, history }) => {
  const handleClick = (event) => {
    console.log(event.target.innerText);
    addWorkout({ [event.target.name]: event.target.innerText }, history);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <h1 className='large text-primary'>Choose Your Workout</h1>
      {showModal ? (
        <AddWorkoutModal
          addWorkout={addWorkout}
          setShowModal={setShowModal}
          history={history}
        />
      ) : null}
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
        onClick={() => setShowModal(!showModal)}
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
