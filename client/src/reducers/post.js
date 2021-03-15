// Work flow:
// If you want to add something to your app that requires state changes, you 1. create a new reducer, 2. a new action file, 3. new component

import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function foo(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ), // we're mapping through every post and if that post has the same id as the payload, then update the likes count of that post. Otherwise, return post
        loading: false,
      };
    default:
      return state;
  }
}
