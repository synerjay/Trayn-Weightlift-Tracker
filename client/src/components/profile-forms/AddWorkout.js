import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWorkout } from '../../actions/workout';
import AddWorkoutModal from '../layout/AddWorkoutModal';

const AddWorkout = ({ addWorkout, history }) => {
  const handleClick = (value) => {
    addWorkout({ workoutName: value }, history);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className='flex flex-col mt-24 px-5'>
      <h1 className='text-center text-4xl font-semibold text-indigo-700'>
        Choose Your Workout{' '}
      </h1>
      <div class='md:flex md:justify-center md:space-x-8 md:px-5 md:py-0'>
        {/* <!-- box-1 --> */}
        <button
          name='workoutName'
          onClick={() => handleClick('Push (Chest, Shoulders, Triceps)')}
          class='mt-5 py-4 px-4 h-4/5  w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0'
        >
          <div class='w-sm'>
            <img
              class='w-64 rounded-lg'
              src='https://images.unsplash.com/photo-1581009137042-c552e485697a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80'
              alt=''
            />
            <div class='mt-4 text-indigo-500 text-center'>
              <h1 class='text-lg font-bold'>Push (Chest & Shoulders)</h1>
              <p class='mt-4 text-gray-600'>
                Pretium lectus quam id leo in vitae turpis. Mattis pellentesque
                id nibh tortor id.
              </p>
              <button class='mt-8 mb-4 p-1 rounded-full bg-indigo-500 text-white tracking-widest hover:bg-indigo-500 transition duration-200'>
                SELECT
              </button>
            </div>
          </div>
        </button>

        {/* <!-- box-2 --> */}
        <button
          name='workoutName'
          onClick={() => handleClick('Pull (Back, Biceps, Lats)')}
          class='mt-5 py-4 px-4 h-4/5  w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0'
        >
          <div class='w-sm'>
            <img
              class='w-64 rounded-lg'
              src='https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2551&q=80'
              alt=''
            />
            <div class='mt-4 text-indigo-500 text-center'>
              <h1 class='text-lg font-bold'>Pull (Back, Biceps, Lats)</h1>
              <p class='mt-4 text-gray-600'>
                Nunc consequat interdum varius sit amet mattis vulputate enim
                nulla. Risus feugiat.
              </p>
              <button class='mt-8 mb-4 p-1 rounded-full bg-indigo-500 text-white tracking-widest hover:bg-indigo-500 transition duration-200'>
                SELECT
              </button>
            </div>
          </div>
        </button>

        {/* <!-- box-3 --> */}
        <button
          name='workoutName'
          onClick={() => handleClick('Legs')}
          class='mt-5 py-4 px-4 h-4/5  w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0'
        >
          <div class='w-sm'>
            <img
              class='w-64 rounded-lg'
              src='https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2553&q=80'
              alt=''
            />
            <div class='mt-4 text-indigo-500 text-center'>
              <h1 class='text-lg font-bold'>Legs</h1>
              <p class='mt-4 text-gray-600'>
                Nisl purus in mollis nunc sed id semper. Rhoncus aenean vel elit
                scelerisque mauris.
              </p>
              <button class='mt-8 mb-4 p-1 rounded-full bg-indigo-500 text-white tracking-widest hover:bg-indigo-500 transition duration-200'>
                SELECT
              </button>
            </div>
          </div>
        </button>
        {/* <!-- box-4 --> */}
        <button
          name='workoutName'
          onClick={() => handleClick('Custom Workout')}
          class='mt-5 py-4 px-4 h-4/5 w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0'
        >
          <div class='w-sm'>
            <img
              class='w-64 rounded-lg'
              src='https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2549&q=80'
              alt=''
            />
            <div class='mt-4 text-indigo-500 text-center'>
              <h1 class='text-lg font-bold'>Custom Workout</h1>
              <p class='mt-4 text-gray-600'>
                Nisl purus in mollis nunc sed id semper. Rhoncus aenean vel elit
                scelerisque mauris.
              </p>
              <button class='mt-8 mb-4 p-1 rounded-full bg-indigo-500 text-white tracking-widest hover:bg-indigo-500 transition duration-200'>
                SELECT
              </button>
            </div>
          </div>
        </button>
      </div>
    </div>
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

// <Fragment>
//       <h1 className='text-4xl mb-5 font-semibold text-indigo-700'>
//         Choose Your Workout
//       </h1>
//       {showModal ? (
//         <AddWorkoutModal
//           addWorkout={addWorkout}
//           setShowModal={setShowModal}
//           history={history}
//         />
//       ) : null}
//       <button
//         name='workoutName'
//         onClick={(event) => handleClick(event)}
//         className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
//       >
//         Push (Chest, Shoulders, Triceps)
//       </button>
//       <button
//         name='workoutName'
//         onClick={(event) => handleClick(event)}
//         className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
//       >
//         Pull (Back, Biceps, Lats)
//       </button>
//       <button
//         name='workoutName'
//         onClick={(event) => handleClick(event)}
//         className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
//       >
//         Legs
//       </button>
//       <button
//         name='workoutName'
//         onClick={() => setShowModal(!showModal)}
//         className='w-full h-16 border-10 border-black bg-white rounded-lg my-0.5 hover:bg-gray-200'
//       >
//         Custom Workout
//       </button>
//     </Fragment>
