import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getWorkouts } from '../../actions/workout';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Workout from './Workout';
import CustomModal from '../layout/CustomModal';
import WorkoutProfile from '../profile/WorkoutProfile';
import Activity from './Activity';
import ReactLoading from 'react-loading';

// We are going to use the getCurrentProfile action to redux as soon as the component loads
// So we are going to use useEffect hooks to fire getCurrentProfile in the initial load

const Dashboard = ({
  getWorkouts,
  auth: { user, isAuthenticated },
  // profile: { profile, loading },
  workout: { workouts, loading },
}) => {
  useEffect(() => {
    setTimeout(function () {
      getWorkouts();
    }, 600);
    // getCurrentProfile();
  }, [isAuthenticated]); // <--- getCurrentProfil function is going to fire once

  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [workoutId, setWorkoutId] = useState('');

  return loading && workouts.length === 0 ? (
    <div className='w-full h-screen flex justify-center mt-32 md:mt-36 '>
      <ReactLoading type='spin' color='#312E81' width={300} />
    </div>
  ) : (
    <div className='min-h-screen flex mt-8'>
      <DashboardActions />
      <div className='w-full md:w-4/5 flex-grow-0 py-10 px-2'>
        <div className='my-5 mx-2'>
          <h4 class='text-sm font-bold text-indigo-600'>
            Hi {user && user.name},
          </h4>
          <h1 class='text-4xl font-bold text-indigo-900 mt-'>
            Welcome to Trayn!
          </h1>
        </div>
        <Fragment>
          {showWorkoutModal ? (
            <CustomModal
              component={WorkoutProfile}
              setShowModal={setShowWorkoutModal}
              workoutId={workoutId}
            />
          ) : null}

          <div className='block md:hidden'>
            <Link
              to='/add-workout'
              className='flex items-center mb-7 w-44 max-w-xs cursor-pointer bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg p-1 font-semibold'
            >
              {' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 mr-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              New Workout
            </Link>
          </div>
          <Activity workouts={workouts} />
          <Workout
            workouts={workouts}
            showModal={setShowWorkoutModal}
            setWorkoutId={setWorkoutId}
          />
        </Fragment>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  workout: state.workout,
});

export default connect(mapStateToProps, {
  getWorkouts,
})(Dashboard);
