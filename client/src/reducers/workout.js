import {
  GET_WORKOUT,
  GET_WORKOUTS,
  ADD_WORKOUT,
  ADD_SET,
  ADD_EXERCISE,
  DELETE_WORKOUTS,
  WORKOUT_ERROR,
  CLEAR_WORKOUT,
} from './types';

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
        post: payload,
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
        loading: false,
      };
    // case UPDATE_LIKES:
    //   return {
    //     ...state,
    //     workouts: state.workouts.map((post) =>
    //       post._id === payload.id ? { ...post, likes: payload.likes } : post
    //     ), // we're mapping through every post and if that post has the same id as the payload, then update the likes count of that post. Otherwise, return post
    //     loading: false,
    //   };
    case ADD_SET:
    case ADD_EXERCISE:
      return {
        ...state,
        workout: payload,
        loading: false,
      };
    // case REMOVE_WORKOUT:
    //   return {
    //     ...state,
    //     post: {
    //       ...state.post,
    //       comments: state.post.comments.filter(
    //         (comment) => comment._id !== payload
    //       ),
    //     },
    //   };
    default:
      return state;
  }
}
