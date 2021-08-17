import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setMenu(false);
  }, []);

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
        <Link
          to='/add-workout'
          className='flex flex-row h-10 rounded items-center bg-indigo-600 text-white p-1 mt-0 cursor-pointer hover:bg-indigo-700 hover:text-indigo-400'
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
          onClick={() => setMenu(!menu)}
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
        </button>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <div class='md:flex text-gray-700 text-sm font-bold hidden sm:block ml-2 gap-x-3 '>
      {/* <Link
        class='bg-gray-900 hover:bg-gray-700 text-white p-1 rounded cursor-pointer hover:text-green-400'
        to='/profiles'
      >
        Members
      </Link> */}
      <Link
        class='bg-indigo-50 border-2 border-indigo-700 hover:bg-indigo-700 text-gray-700 p-1 rounded cursor-pointer hover:text-indigo-50'
        to='/login'
      >
        Login
      </Link>
      <Link
        class='bg-indigo-600 hover:bg-indigo-700 text-gray-200 p-1 rounded cursor-pointer hover:text-indigo-200'
        to='/register'
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <>
      <header class='navbar w-full h-16 md:h-16 bg-gray-900 p-1 flex justify-between items-center'>
        <h1 className='text-indigo-400 text-3xl font-bold'>
          <Link to='/'>TRAYN</Link>{' '}
        </h1>

        <nav class='w-1/2 flex items-center justify-end'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </nav>
      </header>
      {menu ? (
        <>
          <div class='navbar-menu relative z-50'>
            <div class='navbar-backdrop fixed inset-0 bg-gray-800 opacity-25'></div>
            <nav class='fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-gray-800 overflow-y-auto'>
              <div class='flex justify-center items-center mb-8'>
                <a class='mr-auto text-3xl font-bold leading-none' href='#'>
                  heya music social
                </a>
                <button onClick={() => setMenu(!menu)} class='navbar-close'>
                  <svg
                    class='h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M6 18L18 6M6 6l12 12'
                    ></path>
                  </svg>
                </button>
              </div>
              <div>
                <ul>
                  <li class='mb-1'>
                    <Link
                      onClick={() => setMenu(false)}
                      to='/dashboard'
                      class='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li class='mb-1'>
                    <Link
                      onClick={() => setMenu(false)}
                      to='/posts'
                      class='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                    >
                      Music Feed
                    </Link>
                  </li>
                  <li class='mb-1'>
                    <Link
                      onClick={() => setMenu(false)}
                      to='/profiles'
                      class='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                    >
                      Members
                    </Link>
                  </li>
                  <li class='mb-1'>
                    <Link
                      onClick={() => setMenu(false)}
                      class='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                      to='/add-artist'
                    >
                      Add Artist
                    </Link>
                  </li>
                  <li class='mb-1'>
                    <Link
                      onClick={() => setMenu(false)}
                      class='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                      to='/add-album'
                    >
                      Add Albums
                    </Link>
                  </li>
                  <li class='mb-1'>
                    <Link
                      onClick={() => setMenu(false)}
                      class='block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-900 hover:text-green-600 rounded'
                      to='/add-track'
                    >
                      Add Tracks
                    </Link>
                  </li>
                </ul>
              </div>
              <div class='mt-auto'>
                <div class='pt-6'>
                  <a
                    class='block p-1 mb-3 leading-loose text-xs text-center font-semibold bg-gray-900 hover:bg-gray-900 rounded-xl'
                    href='#'
                  >
                    Settings
                  </a>
                  <a
                    onClick={logout}
                    href='#!'
                    class='block p-1 mb-2 leading-loose text-xs text-center text-white font-semibold bg-red-600 hover:bg-red-700  rounded-xl'
                  >
                    Log out
                  </a>
                </div>
                <p class='my-4 text-xs text-center text-gray-400'>
                  <span>Copyright © 2021</span>
                </p>
              </div>
            </nav>
          </div>
        </>
      ) : null}
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

// const authLinks = (
//   <ul>
//     <li>
//       <Link to='/profiles'>Members</Link>
//     </li>
//     <li>
//       <Link to='/Posts'>Posts</Link>
//     </li>
//     <li>
//       <Link to='/dashboard'>
//         <i className='fas fa-user'></i>{' '}
//         <span className='hide-sm'>Dashboard</span>
//       </Link>
//     </li>
//     <li>
//       <a onClick={logout} href='#!'>
//         <i className='fas fa-sign-out-alt'></i>{' '}
//         <span className='hide-sm'>Logout</span>
//       </a>
//     </li>
//   </ul>
// );

// const guestLinks = (
//   <ul className='font-bold'>
//     <li>
//       <Link to='/profiles'>Members</Link>
//     </li>
//     <li>
//       <Link to='/register'>Register</Link>
//     </li>
//     <li>
//       <Link to='/login'>Login</Link>
//     </li>
//   </ul>
// );

// Return

{
  /* <nav className='navbar bg-dark'>
<h1 className='text-xl font-bold'>
  <Link to='/'>
    <i className='fas fa-code'></i> TRAYN
  </Link>
</h1>
{!loading && (
  <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
)}
</nav> */
}
