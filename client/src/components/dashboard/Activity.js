import React from 'react';
import DashboardActions from './DashboardActions';

const Activity = () => {
  return (
    <div className='min-h-screen flex mt-8'>
      <DashboardActions />
      <div className='w-full flex-grow py-10 px-2'>
        <div class='flex space-x-10'>
          <div class='flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg'>
            <div>
              <span class='text-sm font-semibold text-gray-400'>
                Spent this month
              </span>
              <h1 class='text-2xl font-bold'>$682.5</h1>
            </div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-8 w-8 text-indigo-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M5 11l7-7 7 7M5 19l7-7 7 7'
                />
              </svg>
            </div>
          </div>
          <div class='flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg'>
            <div>
              <span class='text-sm font-semibold text-gray-400'>
                Spent this month
              </span>
              <h1 class='text-2xl font-bold'>$682.5</h1>
            </div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-8 w-8 text-indigo-600'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
