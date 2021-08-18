import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  // Component State Hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // The ...formData is a spreader and copies the formData
  // [e.target.name] corresponding to "name" attribute (not the value) of each HTML tags
  // e.target.value -- is the change in value in the fields

  //Subit function form - we use the "register" action here that will send to the reducer
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // if we want to make a request to the server without using Redux
  //Ultimately we want to use Redux to handle this request
  // For references only below
  /*
            const newUser = {
              name,
              email,
              password,
              password2
            }

            try {
              const config = {
                headers: {
                  'Content-Type': 'application/json'
                }
              }

              const body = JSON.stringify(newUser);

              const res = await axios.post('/api/users', body, config);
              console.log(res.data)

            } catch (err) {
              console.error(err.response.data);
            }
          }
          */
  // Redirect to dashboard

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='signupbg mt-16 pt-16 md:pt-10'>
      <div className='bg-gray-200 -mt-10 md:-mt-4 text-gray-900 rounded-3xl mx-auto shadow-xl w-11/12 md:w-1/2 overflow-hidden'>
        <div className='w-full py-10 px-5 md:px-10'>
          <div className='text-center mb-5'>
            <h1 className='font-bold text-3xl text-indigo-800'>SIGN UP</h1>
            <p>Enter the information below to create your own account</p>
          </div>
          <div>
            {/* dfsdfd */}
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='flex -mx-3'>
                <div className='w-full px-3 mb-5'>
                  <label for='' className='text-xs font-semibold px-1'>
                    Name
                  </label>
                  <div className='flex'>
                    <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                      <i className='mdi mdi-account-outline text-gray-400 text-lg'></i>
                    </div>
                    <input
                      type='text'
                      className='w-full -ml-10 p-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                      placeholder='Name'
                      name='name'
                      value={name}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='flex -mx-3'>
                <div className='w-full px-3 mb-5'>
                  <label for='' className='text-xs font-semibold px-1'>
                    Email
                  </label>
                  <div className='flex'>
                    <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                      <i className='mdi mdi-email-outline text-gray-400 text-lg'></i>
                    </div>
                    <input
                      type='email'
                      className='w-full -ml-10 p-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                      placeholder='your@email.com'
                      name='email'
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='flex -mx-3'>
                <div className='w-1/2 px-3 mb-12'>
                  <label for='' className='text-xs font-semibold px-1'>
                    Password
                  </label>
                  <div className='flex'>
                    <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                      <i className='mdi mdi-lock-outline text-gray-400 text-lg'></i>
                    </div>
                    <input
                      type='password'
                      className='w-full -ml-10 p-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                      placeholder='************'
                      name='password'
                      value={password}
                      onChange={(e) => onChange(e)}
                      minLength='6'
                    />
                  </div>
                </div>
                <div className='w-1/2 px-3 mb-12'>
                  <label for='' className='text-xs font-semibold px-1'>
                    Confirm Password
                  </label>
                  <div className='flex'>
                    <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                      <i className='mdi mdi-lock-outline text-gray-400 text-lg'></i>
                    </div>
                    <input
                      type='password'
                      className='w-full -ml-10 p-1 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
                      placeholder='************'
                      name='password2'
                      value={password2}
                      onChange={(e) => onChange(e)}
                      minLength='6'
                    />
                  </div>
                </div>
              </div>
              <div className='flex -mx-3'>
                <div className='w-full px-3 mb-5'>
                  <input
                    type='submit'
                    className='block w-full max-w-xs mx-auto cursor-pointer bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg p-1 font-semibold'
                    value='REGISTER NOW'
                  />
                </div>
              </div>
              {/*  */}
            </form>
            <p className='text-sm text-center flex justify-center gap-x-1'>
              Already have an account?{' '}
              <Link to='/login'>
                {' '}
                <p className='text-indigo-600'>Log In</p>
              </Link>
            </p>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);

{
  /* <Fragment>
<div className='container-form flex justify-between w-auto'>
  <div className='iphone bg-gray-500 w-1/2 rounded-3xl border-gray-900 border-4'></div>
  <div className='p-10 w-3/6'>
    <h1 className='large text-primary'>Sign Up</h1>
    <p className='lead'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-9 inline-block mr-1'
        viewBox='0 0 20 20'
        fill='currentColor'
      >
        <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
      </svg>{' '}
      Create Your Account
    </p>
    <form className='form' onSubmit={(e) => onSubmit(e)}>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='email'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <small className='form-text'>
          This site uses Gravatar so if you want a profile image, use a
          Gravatar email
        </small>
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='Confirm Password'
          name='password2'
          value={password2}
          onChange={(e) => onChange(e)}
          minLength='6'
        />
      </div>
      <input type='submit' className='btn btn-primary' value='Register' />
    </form>
    <p className='my-1'>
      Already have an account? <Link to='/login'>Log In</Link>
    </p>
  </div>
</div>
</Fragment> */
}
