const initialState = {
  workout: null,
  workouts: [],
  loading: true,
  error: {},
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WORKOUT:
    case UPDATE_WORKOUT: // UPDATE_PROFILE has the same action has GET_PROFILE type because we just need to send the payload to the state
      return {
        ...state,
        workout: payload,
        loading: false,
      };
    case GET_WORKOUTS:
      return {
        ...state,
        workouts: payload,
        loading: false,
      };
    case WORKOUT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        workout: null,
      };
    case CLEAR_WORKOUT:
      return {
        ...state,
        workout: null,
        loading: false,
      };
    default:
      return state;
  }
}
