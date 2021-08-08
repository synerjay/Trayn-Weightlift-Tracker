import React, { useState } from 'react';

const AddWorkoutModal = ({ addWorkout, setShowModal, history }) => {
  const [formData, setFormData] = useState({
    workoutName: '',
  });

  const { workoutName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <div className='h-full w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='h-1/2 w-5/6 overflow-y-autorelative my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className=' h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t'>
              <div className='flex flex-col'>
                <h3 className='text-3xl font-semibold'>
                  Name this Custom Workout
                </h3>
              </div>
              <div className='flex flex-row'>
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
              <form
                className='form'
                onSubmit={(e) => {
                  e.preventDefault();
                  addWorkout(formData, history);
                }}
              >
                {' '}
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='* Choose a Workout Name'
                    name='workoutName'
                    value={workoutName}
                    onChange={onChange}
                    required
                  />
                </div>
                <input type='submit' className='btn btn-primary my-1' />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};

export default AddWorkoutModal;
