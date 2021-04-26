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
    <Fragment>
      <div className='container-form flex justify-between w-auto border-gray-900 border-4 mx-0'>
        <div className='bg-gray-500 w-1/2 rounded-3xl border-gray-900 border-4'></div>
        <div className='shadow p-10 w-3/6'>
          <h1 className='large text-primary'>Sign Up</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Create Your Account
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
    </Fragment>
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
