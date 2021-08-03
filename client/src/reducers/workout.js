import {
  GET_WORKOUT,
  GET_WORKOUTS,
  ADD_WORKOUT,
  ADD_SET,
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  REMOVE_SET,
  DELETE_WORKOUTS,
  WORKOUT_ERROR,
  CLEAR_WORKOUT,
} from '../actions/types';

const initialState = {
  workouts: [],
  workout: null,
  loading: true,
  error: {},
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WORKOUTS:
      return {
        ...state,
        workouts: payload,
        loading: false,
      };
    case GET_WORKOUT:
      return {
        ...state,
        workout: payload,
        loading: false,
      };
    case ADD_WORKOUT:
      return {
        ...state,
        workout: payload,
        workouts: [payload, ...state.workouts],
        loading: false,
      };
    case DELETE_WORKOUTS:
      return {
        ...state,
        workout: null,
        workouts: state.workouts.filter((workout) => workout._id !== payload), // FILTER method: returns ALL workouts that have ID that are NOT equal to payload ID
        loading: false,
      };
    case WORKOUT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_WORKOUT:
      return {
        ...state,
        workout: null,
        workouts: [],
        loading: false,
      };
    case ADD_SET:
    case ADD_EXERCISE:
    case REMOVE_EXERCISE:
    case REMOVE_SET:
      return {
        ...state,
        workout: payload,
        loading: false,
      };
    // case REMOVE_EXERCISE:
    //   return {
    //     ...state,
    //     workout: {
    //       ...state.workout,
    //       exercise: state.workout.exercise.filter(
    //         (item) => item._id !== payload
    //       ),
    //     },
    //   };
    default:
      return state;
  }
}
