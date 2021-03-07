import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// The store.js is where we make the Redux Store

// Call an initial state for the store
const initialState = {};

const middleware = [thunk];

//This is where we make the actual Redux store:

const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
