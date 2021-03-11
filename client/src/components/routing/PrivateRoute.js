import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// this Prive Route component prevent guests from visiting Dashboard and Profile without a token

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

// this PrivateRoute component only subscribes to the state (hence, only mapStateToProps in connect function)
// no actions are being made to Redux (hence, no mapStateToDispatch in connect function)
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
