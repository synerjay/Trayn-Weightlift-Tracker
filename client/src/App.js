
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Landing } from './components/layout/Landing';
import { Navbar } from './components/layout/Navbar';
//Redux Stuff
import { Provider } from 'react-redux';
import store from './store';

//Provider tag provides the components with the props that will be the redux states
//This connects React and Redux together
// Pass the "store" props in the Provider tags

const App = () => (
 <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container"> {/* This section is for the Login and Register components to center in the page*/}
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
