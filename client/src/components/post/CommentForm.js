import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
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

const CommentForm = ({ postId, addComment }) => {
  const classes = useStyles();

  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault(); //prevents refresh of the page once submitted
    addComment(postId, { text }); // action to the reducer with text data deconstructed
    setText(''); // <-- set the text state back to initial state once submitted for the next text input
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form
        // className='form my-1'
        onSubmit={onSubmit}
      >
        <TextField
          className={classes.field}
          name='text'
          label='Comment'
          value={text}
          variant='outlined'
          onChange={(e) => setText(e.target.value)}
          fullWidth
          multiline
          rows='5'
          placeholder='Comment on this post'
          required
        />
        <Button
          type='submit'
          // className='btn btn-dark my-1'
          value='Add Comment'
          endIcon={<KeyboardArrowRightOutlinedIcon />}
        >
          Post Comment
        </Button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);

{
  /* <textarea
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          required
        ></textarea> */
}
