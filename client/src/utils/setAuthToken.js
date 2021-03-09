import axios from 'axios';

//not adding a request but making a global header

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// if we have a token, we are going to send the token in every request.
//This is why it in the utils because we want this in a global variable accessible anywhere where a x-auth-token needs to be set

export default setAuthToken;
