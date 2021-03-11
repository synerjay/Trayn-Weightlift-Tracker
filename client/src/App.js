import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
//Redux Stuff
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';

//Provider tag provides the components with the props that will be the redux states
//This connects React and Redux together
// Pass the "store" props in the Provider tags

if (localStorage.token) {
  setAuthToken(localStorage.token);
} // if there is a token in the local storage then set it setAuthToken function to set in every request

const App = () => {
  //Use effect hook is like componentDidMount in class React
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // <-- empty array, this useEffect hook will only fire once
  // this will fire the loadUser function which loads the JSONwebtoken in the REDUX store
  // Since JSON WebToken is a stateless token the App component must mount the loadUser action ONCE so that if there is a token, it is stored in the x-auth-token in client

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            {' '}
            {/* This section is for the Login and Register components to center in the page*/}
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
