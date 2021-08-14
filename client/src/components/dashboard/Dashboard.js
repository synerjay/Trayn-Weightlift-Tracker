import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getWorkouts } from '../../actions/workout';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Workout from './Workout';
import CustomModal from '../layout/CustomModal';
import WorkoutProfile from '../profile/WorkoutProfile';
import Activity from './Activity';

// We are going to use the getCurrentProfile action to redux as soon as the component loads
// So we are going to use useEffect hooks to fire getCurrentProfile in the initial load

const Dashboard = ({
  getWorkouts,
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  workout: { workouts },
}) => {
  useEffect(() => {
    getWorkouts();
    getCurrentProfile();
  }, [getCurrentProfile, getWorkouts]); // <--- getCurrentProfil function is going to fire once

  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [workoutId, setWorkoutId] = useState('');

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className='min-h-screen flex mt-8'>
      <DashboardActions />
      <div className='w-4/5  flex-grow-0 py-10 px-2'>
        <div className='my-5 mx-2'>
          <h4 class='text-sm font-bold text-indigo-600'>
            Hi {user && user.name},
          </h4>
          <h1 class='text-4xl font-bold text-indigo-900 mt-'>
            Welcome to Trayn!
          </h1>
        </div>
        {profile !== null ? (
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
                className='flex items-center w-44 max-w-xs cursor-pointer bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg p-1 font-semibold'
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
            {/* <Experience experience={profile.experience} /> */}
            {/* <Education education={profile.education} /> */}

            <Activity />
            <Workout
              workouts={workouts}
              showModal={setShowWorkoutModal}
              setWorkoutId={setWorkoutId}
            />

            <div className='my-2'>
              <button
                className='btn btn-danger'
                onClick={() => deleteAccount()}
              >
                <i className='fas fa-user-minus' /> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  workout: state.workout,
});

export default connect(mapStateToProps, {
  getWorkouts,
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
