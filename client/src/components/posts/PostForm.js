import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import Button from '@material-ui/core/Button';
import { makeStyles, TextField } from '@material-ui/core';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

const PostForm = ({ addPost }) => {
  const classes = useStyles();

  // 1. Make a component state,
  const [text, setText] = useState('');

  //2. Make input field response to state change - HTML tags need to be changed with value={NameOfField} and onChange={onChange}
  //const onChange = (e) => setText({ ...text, [e.target.name]: e.target.value });

  // 3. make data passed to the reduce
  const onSubmit = (e) => {
    e.preventDefault(); //prevents refresh of the page once submitted
    addPost({ text }); // action to the reducer with text data deconstructed
    setText(''); // <-- set the text state back to initial state once submitted for the next text input
  };

  return (
    <Fragment>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form
          // className='form my-1'
          onClick={onSubmit}
        >
          <TextField
            name='text'
            className={classes.field}
            label='Create a Status Update'
            value={text}
            variant='outlined'
            color='primary'
            onChange={(e) => setText(e.target.value)}
            fullWidth
            multiline
            rows={5}
            placeholder='Create a Status Update'
            required
          />
          <Button
            type='submit'
            color='primary'
            // className='btn btn-dark my-1'
            variant='contained'
            endIcon={<KeyboardArrowRightOutlinedIcon />}
          >
            Post Status
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
