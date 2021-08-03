import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWorkout } from '../../actions/workout';

const AddWorkout = ({ addWorkout, history }) => {
  const [formData, setFormData] = useState({
    workoutName: '',
  });

  const { workoutName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addWorkout(formData, history);
        }}
      >
        {' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='workoutName'
            value={workoutName}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addWorkout: PropTypes.func.isRequired,
};

export default connect(null, { addWorkout })(AddWorkout);
