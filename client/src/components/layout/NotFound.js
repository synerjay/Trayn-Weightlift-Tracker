import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Fragment>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'></i> Oops! Page Not Found
      </h1>
      <p className='large'>Sorry, this page doest not exist!</p>
      <Link className='btn btn-light my-1' to='/dashboard'>
        Go Back
      </Link>
    </Fragment>
  );
};

export default NotFound;
