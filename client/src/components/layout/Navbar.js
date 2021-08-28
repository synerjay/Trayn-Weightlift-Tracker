import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMenu(false);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  const authLinks = (
    <Fragment>
      <div class=' text-white text-xs md:hidden hidden sm:block ml-2 gap-x-1 '>
        <Link
          to='/add-workout'
          class='bg-indigo-600 hover:bg-indigo-700 text-white p-1 font-semibold rounded cursor-pointer hover:text-indigo-200'
        >
          New Workout
        </Link>
        <Link
          to='/dashboard'
          class='bg-indigo-50 border-2 border-indigo-700 hover:bg-indigo-700 text-gray-700 p-1 rounded cursor-pointer hover:text-indigo-50'
        >
          Dashboard
        </Link>
        <a
          onClick={logout}
          href='#!'
          class='bg-red-500 hover:bg-gray-700 text-white p-1 rounded cursor-pointer ml-1'
        >
          <button className='rounded inline-flex items-center'>
            <svg
              className='w-3 h-3 mr-2'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                clipRule='evenodd'
              />
            </svg>
            <span className='font-semibold'>Logout</span>
          </button>
        </a>
      </div>
      <div className='flex justify-around space-x-7 w-1/2 md:hidden'>
        {location.pathname === '/add-workout' ||
        location.pathname === '/add-exercise' ? null : (
          <>
            <Link
              to='/add-workout'
              className='flex flex-row h-10 font-bold rounded items-center bg-indigo-600 text-white p-1 mt-0 cursor-pointer hover:bg-indigo-700 hover:text-indigo-400'
            >
              {' '}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 mr-1'
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
              </svg>{' '}
              New
            </Link>
            <button
              onClick={() => setOpen(!open)}
              class='navbar-burger flex items-center text-gray-200 mr-0'
            >
              <svg
                class='block h-4 w-4 fill-current'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Mobile menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
              </svg>
            </button>{' '}
          </>
        )}
      </div>
    </Fragment>
  );

  const guestLinks = (
    <div class='flex items-center text-white text-sm font-bold ml-2 gap-x-3 md:gap-x-5 '>
      {/* <Link
        class='bg-gray-900 hover:bg-gray-700 text-white p-1 rounded cursor-pointer hover:text-green-400'
        to='/profiles'
      >
        Members
      </Link> */}
      <Link
        class='flex items-center bg-indigo-50 h-10 border-1 border-indigo-200 hover:bg-indigo-50 text-gray-700 p-1 rounded cursor-pointer hover:text-indigo-900'
        to='/login'
      >
        Login
      </Link>
      <Link
        class='flex items-center bg-indigo-700 h-10 hover:bg-indigo-700 text-gray-200 p-1 rounded cursor-pointer hover:text-indigo-200'
        to='/register'
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <>
      <header class='navbar w-full h-16 md:h-16 bg-gray-900 p-1 flex justify-between items-center'>
        <Link
          className='text-indigo-100 tracking-widest text-3xl -ml-5 md:text-3xl flex font-extrabold italic justify-around items-center w-36   md:w-40  '
          to='/'
        >
          <svg
            version='1.1'
            id='Layer_1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            width='40px'
            height='40px'
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
        </Link>

        <nav class='w-1/2 flex items-center justify-end'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </nav>
      </header>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 overflow-hidden'
          onClose={setOpen}
        >
          <div className='absolute inset-0 overflow-hidden'>
            <Transition.Child
              as={Fragment}
              enter='ease-in-out duration-500'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in-out duration-500'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>
            <div className='fixed inset-y-0 mt-16 right-0 pl-10 max-w-full flex'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <div className='relative w-screen max-w-md'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='rounded-md text-indigo-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                        onClick={() => setOpen(false)}
                      >
                        <span className='sr-only'>Close panel</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='h-full flex flex-col py-6 bg-gray-900 shadow-xl overflow-y-scroll'>
                    <div className='px-4 sm:px-6'>
                      <Dialog.Title className='text-2xl font-bold text-indigo-300'>
                        Welcome, {user && user.name}
                      </Dialog.Title>
                    </div>
                    <div className='mt-6 relative flex-1 px-4 sm:px-6'>
                      {/* Replace with your content */}
                      <div className='flex flex-col justify-between h-full'>
                        <div>
                          <ul>
                            <li class='mb-1'>
                              <Link
                                onClick={() => setOpen(false)}
                                to='/dashboard'
                                class='block p-4 text-md font-semibold text-indigo-100 hover:bg-gray-800 hover:text-indigo-300 rounded'
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li class='mb-1'>
                              <Link
                                onClick={() => setOpen(false)}
                                to='/settings'
                                class='block p-4 text-md font-semibold text-indigo-100 hover:bg-gray-800 hover:text-indigo-300 rounded'
                              >
                                Settings
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div class='mt-auto'>
                          <div class='pt-6'>
                            <a
                              onClick={() => handleLogout()}
                              href='#!'
                              class='block p-1 mb-2 leading-loose text-xs text-center text-white font-semibold bg-red-600 hover:bg-red-700  rounded-xl'
                            >
                              Log out
                            </a>
                          </div>
                          <p class='my-4 text-xs text-center text-gray-400'>
                            <span>
                              Created in React & Node Express by J. Tolentino ©
                              2021
                            </span>
                          </p>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
