import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import workout from './workout';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  workout,
});

//This is the root reducer. and this reducer combines all separate reducers into one
// The reducer is like the robot that guards the warehouse (Redux store) in which it selects what information it should change or fetch
