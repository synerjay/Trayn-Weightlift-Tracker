import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const DashboardActions = ({ logout }) => {
  return (
    <div class='py-12 px-10 w-1/4 hidden md:flex md:flex-col bg-gray-200'>
      <Link
        to='/add-workout'
        class='flex items-center space-x-2 mt-6 p-1 bg-indigo-600 rounded-md'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 text-white'
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
        <p class='text-md text-white font-semibold'>New Workout</p>
      </Link>
      <div class='mt-8'>
        <ul class='space-y-10'>
          <li>
            <Link
              to='/dashboard'
              class='flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 mr-4 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z' />
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <a
              href='#'
              class='flex items-center text-sm font-semibold text-gray-500 transition duration-200 hover:text-indigo-600'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
                />
              </svg>
              Library
            </a>
          </li>
          <li>
            <a
              href='#'
              class='flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fill-rule='evenodd'
                  d='M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clip-rule='evenodd'
                />
              </svg>
              Security
            </a>
          </li>
          <li>
            <a
              href='#'
              class='flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
              Schedules
            </a>
          </li>
          <li>
            <a
              href='#'
              class='flex items-centerx text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              Payouts
            </a>
          </li>
          <li>
            <a
              href='#'
              class='flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                />
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div class=''>
        <a
          onClick={logout}
          // href='#'
          class='flex mt-20 space-x-4 items-center font-semibold text-gray-500 hover:text-indigo-600 transition duration-200 cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            class='h-6 w-6 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
          <p>Logout</p>
        </a>
      </div>
    </div>
  );
};

DashboardActions.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(DashboardActions);
