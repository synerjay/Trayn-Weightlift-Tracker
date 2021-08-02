import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_WORKOUT,
  ADD_WORKOUT,
  ADD_SET,
  ADD_EXERCISE,
  GET_WORKOUTS,
  DELETE_WORKOUTS,
  WORKOUT_ERROR,
  CLEAR_WORKOUT,
} from './types';

// Create a workout

export const addWorkout = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/workout', formData);
    // in a post request to the backend, the data is inputed in the second argument of the axios.post method

    dispatch({
      type: ADD_WORKOUT,
      payload: res.data,
    });

    dispatch(setAlert('Workout Created', 'success'));
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add an Exercise to a Workout

export const addExercise = (workoutId, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/workout/${workoutId}`, formData);

    dispatch({
      type: ADD_EXERCISE,
      payload: res.data,
    });

    dispatch(setAlert('Exercise Added', 'success'));
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add a Set to an Exercise within a Workout

export const addSet = (workoutId, exerciseId, formData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/workout/${workoutId}/${exerciseId}`,
      formData
    );

    dispatch({
      type: ADD_SET,
      payload: res.data,
    });

    dispatch(setAlert('Set Added', 'success'));
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get all Workouts by user

export const getWorkouts = () => async (dispatch) => {
  dispatch({ type: CLEAR_WORKOUT });

  try {
    const res = await axios.get('/api/workout');

    dispatch({
      type: GET_WORKOUTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
