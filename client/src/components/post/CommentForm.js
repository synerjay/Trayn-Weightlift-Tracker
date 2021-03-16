import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
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
      <form className='form my-1' onSubmit={onSubmit}>
        <textarea
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          required
        ></textarea>
        <input
          type='submit'
          className='btn btn-dark my-1'
          value='Add Comment'
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
