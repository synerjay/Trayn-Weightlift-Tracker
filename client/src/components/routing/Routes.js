import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound';
import AddWorkout from '../profile-forms/AddWorkout';
import AddExercise from '../profile-forms/AddExercise';

const Routes = () => {
  return (
    <section className='container'>
      {' '}
      <Alert />
      <Switch>
        <PrivateRoute exact path='/add-workout' component={AddWorkout} />
        <PrivateRoute exact path='/add-exercise' component={AddExercise} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
