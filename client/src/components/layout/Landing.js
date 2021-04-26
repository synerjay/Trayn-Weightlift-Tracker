import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  // if the user is logged in and is going to landing page, redirect to dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner mx-40'>
          <h1 className='mb-6 text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-green-500'>
            Developer Social Circle
          </h1>
          <p className='lead my-5'>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
          <div className='iphone bg-gray-500 w-1/2 rounded-3xl border-gray-900 border-4'></div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
