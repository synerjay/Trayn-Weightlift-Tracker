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
        <div className='landing-inner'>
          <h1 className='x-large font-bold text-indigo-100'>
            Get Your Lifts to a Higher level with Trayn
          </h1>
          <p className='lead '>
            Track and record your progress using Trayn's intuitive set by rep
            system
          </p>
          <div className=''>
            <Link
              to='/register'
              class='flex mt-10 w-56   items-center space-x-3 p-1 bg-indigo-600 text-white rounded-lg  transition-all duration-400 transform hover:scale-105 cursor-pointer hover:shadow-lg'
            >
              <button class='text-lg text-md '>Let's get started</button>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                  />
                </svg>
              </span>
            </Link>
          </div>
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

{
  /* <section className='landing'>
<div className='landing-inner mx-40'>
  <h1 className='mb-1 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-blue-500'>
    Get Your Lifts to a Higher level with Trayn
  </h1>
  <p className='lead my-1'>
    Track and record your progress using Trayn's intuitive set by rep
    system
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
</section> */
}
