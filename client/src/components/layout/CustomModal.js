import React from 'react';

const CustomModal = ({ component: Component, setShowModal, workoutId }) => {
  return (
    <>
      <div className='h-full w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='h-5/6 w-5/6 overflow-y-autorelative my-6 mx-auto max-w-3xl'>
          {/*content*/}
          <div className=' h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='h-full w-full relative p-6 flex-auto overflow-scroll'>
              <Component workoutId={workoutId} />
            </div>
            {/*footer*/}
            <div className=' h-px bg-opacity-0 bg-transparent flex items-center justify-end p-6 rounded-b'>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
};

export default CustomModal;
