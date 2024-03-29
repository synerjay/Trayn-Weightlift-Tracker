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
          <div className='tracking-widest text-indigo-100 text-6xl -ml-5 md:text-6xl flex font-extrabold italic justify-around items-center w-72    md:w-72  mb-5 '>
            <svg
              version='1.1'
              id='Layer_1'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              x='0px'
              y='0px'
              width='80px'
              height='80px'
              fill='white'
              viewBox='0 0 512 512'
              // style='enable-background:new 0 0 512 512;'
              xmlSpace='preserve'
            >
              <g>
                <g>
                  <g>
                    <path
                      d='M505.752,240.915L271.085,6.248c-8.331-8.331-21.839-8.331-30.17,0L6.248,240.915c-8.331,8.331-8.331,21.839,0,30.17
				l234.667,234.667c8.331,8.331,21.839,8.331,30.17,0l234.667-234.667C514.083,262.754,514.083,249.246,505.752,240.915z
				 M256,460.497L51.503,256L256,51.503L460.497,256L256,460.497z'
                    />
                    <path
                      d='M192,234.667v-21.333c0-11.782-9.551-21.333-21.333-21.333c-11.782,0-21.333,9.551-21.333,21.333v85.333
				c0,11.782,9.551,21.333,21.333,21.333c11.782,0,21.333-9.551,21.333-21.333v-21.333h128v21.333
				c0,11.782,9.551,21.333,21.333,21.333c11.782,0,21.333-9.551,21.333-21.333v-85.333c0-11.782-9.551-21.333-21.333-21.333
				C329.551,192,320,201.551,320,213.333v21.333H192z'
                    />
                  </g>
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
            TRAYN
          </div>
          <h1 className='x-large font-bold text-white bg-indigo-900 bg-opacity-30 px-0'>
            Get Your Lifts to a Higher Level
          </h1>
          <p className='lead bg-indigo-900 bg-opacity-30 '>
            Track and record your weightlifting progress using Trayn's intuitive
            record keeping system
          </p>
          <div className=''>
            <Link
              to='/register'
              class='flex mt-10 w-56 items-center space-x-3 p-1 bg-indigo-700 text-white rounded-lg  transition-all duration-400 transform hover:scale-105 cursor-pointer hover:shadow-lg'
            >
              <button class='text-lg text-md '>Let's start trayning</button>
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
