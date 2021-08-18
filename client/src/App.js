import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';

//Components
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

//Security Token and Actions
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import Activity from './components/dashboard/Activity';
import AddWorkout from './components/profile-forms/AddWorkout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

//Provider tag provides the components with the props that will be the redux states
//This connects React and Redux together
// Pass the "store" props in the Provider tags

const App = () => {
  //Use effect hook is like componentDidMount in class React
  useEffect(() => {
    // if there is a token in the local storage then set it setAuthToken function to set in every request
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser());

    // Logs user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []); // <-- empty array, this useEffect hook will only fire once
  // this will fire the loadUser function which loads the JSONwebtoken in the REDUX store
  // Since JSON WebToken is a stateless token the App component must mount the loadUser action ONCE so that if there is a token, it is stored in the x-auth-token in client

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/activity' component={Activity} />
            <PrivateRoute exact path='/add-workout' component={AddWorkout} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
