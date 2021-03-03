const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

//Bring in all models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @router  POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const post = await newPost.save(); // Save new post

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @router  GET api/posts
// @desc    Get all posts
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // -1 means the most recent. Most oldest is date: 1 which is the default

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router  GET api/posts/:id
// @desc    Get one post by ID
// @access  Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // If post id doesnt exist, then send 404 error
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @router  DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // If post id doesnt exist, then send 404 error
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // make sure the one deleting the post is the one that owns the post

    // Check user

    if (post.user.toString() !== req.user.id) {
      // we need to convert post.user.id to string to match req.user.id because originally it is an object user value in the POST schema
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @router  PUT api/posts/like/:id
// @desc    Like a post
// @access  Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // If post id doesnt exist, then send 404 error
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @router  PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // If post id doesnt exist, then send 404 error
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get remove index

    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @router  Posting COMMENTS - POST api/posts/comment/:post_id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id)

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save(); // Save new post

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @router  DELETE api/posts/comment/:postid/:comment_id
// @desc    Comment on a post
// @access  Private

router.delete('/comment/:id/:comment_id', auth, async (req, res)=> {
 try {
  const post = await Post.findById(req.params.id);

  // If post id doesnt exist, then send 404 error
  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  //Pull out comment
   const comment = post.comments.find(comment => comment.id === req.params.comment_id)

   //Make sure comment exists
   if(!comment) {
     return res.status(404).json({ msg: 'Comment does not exist'})
   }

   // Check user

   if(comment.user.toString() !== req.user.id) {
     return res.status(400).json({ msg: 'User not authorized'})
   }

   //Get remove index
   const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);

 } catch (err) {
   console.error(err.message);
      res.status(500).send('Server Error');
 }
})

module.exports = router;
