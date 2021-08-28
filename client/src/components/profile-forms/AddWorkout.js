import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWorkout } from '../../actions/workout';
import AddWorkoutModal from '../layout/AddWorkoutModal';
import { pushExercises } from '../../utils/exerciseData';
import { pullExercises } from '../../utils/exerciseData';
import { legExercises } from '../../utils/exerciseData';
import { Link } from 'react-router-dom';
import push from '../../img/push.jpeg';
import pull from '../../img/pull.jpeg';
import leg from '../../img/leg.jpeg';
import custom from '../../img/custom.jpeg';

const AddWorkout = ({ addWorkout, history }) => {
  const handleClick = (value) => {
    addWorkout({ workoutName: value }, history);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className='flex justify-center md:items-center flex-col mt-24 px-5'>
      <h1 className='text-center text-4xl font-semibold text-indigo-700'>
        Choose Your Workout{' '}
      </h1>
      {showModal ? (
        <AddWorkoutModal
          addWorkout={addWorkout}
          setShowModal={setShowModal}
          history={history}
        />
      ) : null}
      <div class='md:flex md:justify-center md:space-x-8 md:px-5 md:py-0'>
        {/* <!-- box-1 --> */}
        <button
          name='workoutName'
          onClick={() => handleClick('Push (Chest, Shoulders, Triceps)')}
          class='mt-5 py-4 px-4 h-4/5 w-full md:w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0'
        >
          <div class='w-sm'>
            <img
              class='w-full md:w-64 rounded-lg'
              src={push}
              alt='Chest Exercise'
            />
            <div class='mt-4 text-indigo-500 text-center'>
              <h1 class='text-lg font-bold'>Push (Chest & Shoulders)</h1>
              <p class='mt-4 text-gray-600'>
                Push exercises include:{' '}
                {pushExercises.slice(0, 4).map((item) => {
                  return <>{item.exerciseName}, </>;
                })}{' '}
                etc.
              </p>
              <button class='mt-8 mb-4 p-1 rounded-full bg-indigo-700 text-white tracking-widest hover:bg-indigo-500 transition duration-200'>
                SELECT
              </button>
            </div>
          </div>
        </button>

        {/* <!-- box-2 --> */}
        <button
          name='workoutName'
          onClick={() => handleClick('Pull (Back, Biceps, Lats)')}
          class='mt-5 py-4 px-4 h-4/5 w-full md:w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0'
        >
          <div class='w-sm'>
            <img
              class='w-full md:w-64 rounded-lg'
              src={pull}
              alt='Lat Pull Exercise'
            />
            <div class='mt-4 text-indigo-500 text-center'>
              <h1 class='text-lg font-bold'>Pull (Back, Biceps, Lats)</h1>
              <p class='mt-4 text-gray-600'>
                Pull exercises include:{' '}
                {pullExercises.slice(0, 4).map((item) => {
                  return <>{item.exerciseName}, </>;
                })}{' '}
                etc.
              </p>
              <button class='mt-8 mb-4 p-1 rounded-full bg-indigo-700 text-white tracking-widest hover:bg-indigo-500 transition duration-200'>
                SELECT
              </button>
            </div>
          </div>
        </button>

        {/* <!-- box-3 --> */}
        <button
          name='workoutName'
          onClick={() => handleClick('Legs')}
          class='mt-5 py-4 px-4 h-4/5 w-full md:w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0'
        >
          <div class='w-sm'>
            <img
              class='w-full md:w-64 rounded-lg'
              src={leg}
              alt='Leg Exercise'
            />
            <div class='mt-4 text-indigo-500 text-center'>
              <h1 class='text-lg font-bold'>Legs</h1>
              <p class='mt-4 text-gray-600'>
                Leg exercises include:{' '}
                {legExercises.slice(0, 4).map((item) => {
                  return <>{item.exerciseName}, </>;
                })}{' '}
                etc.
              </p>
              <button class='mt-8 mb-4 p-1 rounded-full bg-indigo-700 text-white tracking-widest hover:bg-indigo-500 transition duration-200'>
                SELECT
              </button>
            </div>
          </div>
        </button>
        {/* <!-- box-4 --> */}
        <button
          onClick={() => setShowModal(!showModal)}
          class='mt-5 py-4 px-4 h-4/5 w-full md:w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0'
        >
          <div class='w-sm'>
            <img
              class='w-full md:w-64 rounded-lg'
              src={custom}
              alt='Custom Exercise'
            />
            <div class='mt-4 text-indigo-500 text-center'>
              <h1 class='text-lg font-bold'>Custom Workout</h1>
              <p class='mt-4 text-gray-600'>
                Freely make your own exercises with this custom workout session.
                Get started now.
              </p>
              <button class='mt-8 mb-4 p-1 rounded-full bg-indigo-700 text-white tracking-widest hover:bg-indigo-500 transition duration-200'>
                SELECT
              </button>
            </div>
          </div>
        </button>
      </div>
      <Link
        className='flex w-60  md:w-52 justify-center items-center mt-10 md:mb-0 bg-indigo-600 md:px-6 md:py-2 px-10  h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-700'
        to='/dashboard'
      >
        {' '}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 md:h-3 w-5 md:w-3 mr-2'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
            clipRule='evenodd'
          />
        </svg>
        Back to Dashboard
      </Link>
    </div>
  );
};

AddWorkout.propTypes = {
  addWorkout: PropTypes.func.isRequired,
};

export default connect(null, { addWorkout })(AddWorkout);
