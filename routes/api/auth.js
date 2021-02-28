const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Bring in the user model schema from Models folder to send user info
const User = require('../../models/User');

// @router  GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // -password means that the password from user info isnt being returned
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
