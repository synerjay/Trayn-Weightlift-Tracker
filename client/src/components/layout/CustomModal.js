import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const CustomModal = ({ component: Component, setShowModal, workoutId }) => {
  const [workoutHeader, setWorkoutHeader] = useState(null);

  return (
    <>
      <div className='h-full w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='h-5/6 w-5/6 overflow-y-autorelative my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className=' h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <div className='flex flex-col'>
                <h3 className='text-3xl font-semibold'>
                  {workoutHeader && workoutHeader.workoutName}
                </h3>
                {workoutHeader && (
                  <p className='text-lg'>
                    {' '}
                    First performed on{' '}
                    {format(new Date(workoutHeader.date), 'yyyy/MM/dd')}
                  </p>
                )}
              </div>
              <div className='flex flex-row'>
                <Link
                  className='flex items-center mt-2 md:mb-0 bg-indigo-500 md:px-6 md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-700'
                  to='/add-exercise'
                >
                  {' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    />
                  </svg>
                  Edit Workout
                </Link>
                <button
                  className='p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='h-full w-full relative p-6 flex-auto overflow-scroll'>
              <Component
                setWorkoutHeader={setWorkoutHeader}
                workoutId={workoutId}
                setShowModal={setShowModal}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};

export default CustomModal;
