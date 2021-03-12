import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

// To get the current users profile

export const getCurrentProfile = () => async (dispatch) => {
  // make a request on the backend

  try {
    // axios get response from backend node /api/profile/me
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update a profile

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  // making a request to the backend always use aync/await because it returns a promise
  // when sending data, you need to make a config object constant to send to the backend just like in login auth action

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
    //the same type as getCurrentProfile
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    // if its not an edit (aka first time created) go back to dashboard
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Experience
// It needs formData and history because it needs to go back to the Dashboard afterwards

export const addExperience = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // make a PUT request instead of request because in the backend, we made experience node a PUT request
    const res = await axios.put('/api/profile/experience', formData, config);

    // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
    //the same type as getCurrentProfile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    // if its not an edit (aka first time created) go back to dashboard
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Education

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // make a PUT request instead of request because in the backend, we made experience node a PUT request
    const res = await axios.put('/api/profile/education', formData, config);

    // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
    //the same type as getCurrentProfile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    // if its not an edit (aka first time created) go back to dashboard
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
