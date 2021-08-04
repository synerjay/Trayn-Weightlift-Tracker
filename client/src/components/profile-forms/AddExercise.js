import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExercise } from '../../actions/workout';
import ExerciseItem from './ExerciseItem';

const AddExercise = ({ workout: { workout }, addExercise, history }) => {
  const [formData, setFormData] = useState({
    exerciseName: '',
  });

  const [exercise, setExercise] = useState([]);

  const { exerciseName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!workout) {
      history.push('/add-workout');
    }
  }, []);

  useEffect(() => {
    if (workout) {
      setExercise([...workout.exercise]);
    }
  }, [workout]);

  useEffect(() => {
    console.log(exercise);
  }, [exercise]);

  return (
    <Fragment>
      <h1 className='large text-primary'>{workout.workoutName}</h1>
      <h2> Add an exercise to this workout:</h2>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
          addExercise(workout._id, formData);
        }}
      >
        {' '}
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Add an Exercise'
            name='exerciseName'
            value={exerciseName}
            onChange={onChange}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
      </form>
      <div className='posts'>
        {exercise.map((exercise) => (
          <ExerciseItem
            key={exercise._id}
            exercise={exercise}
            workoutId={workout._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  workout: state.workout,
});

export default connect(mapStateToProps, { addExercise })(AddExercise);
