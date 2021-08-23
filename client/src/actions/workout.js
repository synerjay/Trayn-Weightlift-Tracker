import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_WORKOUT,
  ADD_WORKOUT,
  ADD_SET,
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  REMOVE_SET,
  GET_WORKOUTS,
  DELETE_WORKOUTS,
  WORKOUT_ERROR,
  CLEAR_WORKOUT,
} from './types';

// Create a workout

export const addWorkout = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post('/api/workout', formData);
    // in a post request to the backend, the data is inputed in the second argument of the axios.post method

    dispatch({
      type: ADD_WORKOUT,
      payload: res.data,
    });

    // res.data._id give to the exercise

    dispatch(setAlert('Workout Created', 'success'));
    history.push('/add-exercise');
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
    if (formData['workoutName']) {
      return;
    } else {
      dispatch(setAlert('Exercise Added', 'success'));
    }
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

    if (formData['exerciseName']) {
      return;
    } else {
      dispatch(setAlert('Exercise sets saved', 'success'));
    }
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get all Workouts by user

export const getWorkouts = () => async (dispatch) => {
  // dispatch({ type: CLEAR_WORKOUT });

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

// Get one WORKOUT endpoint here GET_WORKOUT

export const getWorkout = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/workout/${id}`);

    dispatch({
      type: GET_WORKOUT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove a Workout here REMOVE_WORKOUT

export const deleteWorkout = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/workout/${id}`);

    dispatch({
      type: DELETE_WORKOUTS,
      payload: id,
    });

    dispatch(setAlert('Workout Removed', 'success'));
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove an Exercise

export const deleteExercise = (workoutId, id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/workout/${workoutId}/${id}`);

    dispatch({
      type: REMOVE_EXERCISE,
      payload: res.data,
    });

    dispatch(setAlert('Exercise Removed', 'success'));
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove a set here REMOVE_SET

export const deleteSet = (workoutId, exerciseId, id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/workout/${workoutId}/${exerciseId}/${id}`
    );

    dispatch({
      type: REMOVE_SET,
      payload: res.data,
    });

    dispatch(setAlert('Set Removed', 'success'));
  } catch (err) {
    dispatch({
      type: WORKOUT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
