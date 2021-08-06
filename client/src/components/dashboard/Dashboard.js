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
    <Fragment>
      <h1 className='text-red-500 text-2xl'> Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          {showWorkoutModal ? (
            <CustomModal
              component={WorkoutProfile}
              setShowModal={setShowWorkoutModal}
              workoutId={workoutId}
            />
          ) : null}

          <DashboardActions />
          {/* <Experience experience={profile.experience} /> */}
          {/* <Education education={profile.education} /> */}
          <Workout
            workouts={workouts}
            showModal={setShowWorkoutModal}
            setWorkoutId={setWorkoutId}
          />

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
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
    </Fragment>
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
