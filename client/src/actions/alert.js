import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuid } from 'uuid';

// this is a dispatch action for alerts

// thunk middleware able to have dispatch with two arrow functions
// having the dispatch between two arrows we will be able to dispatch more than one action type from this function

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};

// this function or dispatch function can be used by a component and this will send to the alert reducer which will change the state of the alert
