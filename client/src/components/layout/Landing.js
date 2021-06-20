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
      <div className='landing-inner mx-40'>
        <h1 className='mb-1 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-blue-500'>
          The Meeting Place for Music Lovers
        </h1>
        <p className='lead my-1'>
          See what music your friends are currently listening to.
        </p>
        <div className='buttons my-1'>
          <Link
            to='/register'
            className='btn btn-primary hover:bg-green-300 hover:-translate-y-0.5 focus:outline-none focus:ring transform transition'
          >
            Let's Get Started
          </Link>
        </div>
        <div className='iphone bg-gray-500 w-1/2 rounded-3xl border-gray-900 border-4'></div>
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
