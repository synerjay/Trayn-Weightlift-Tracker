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
          className='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ text });
            setText('');
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
