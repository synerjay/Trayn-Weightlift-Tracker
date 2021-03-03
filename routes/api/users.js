const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @router  POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Step 1: See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      // Step 2: Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // pic size
        r: 'pg', // pg rating
        d: 'mm' // default pic -- even with no gravatar
      });

      // New instance of user -- NOT yet saved:

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Step 3: Encrypt password using b-crypt
      //Create a "salt"
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save(); // User being saved in the database

      //Step 4: Return JsonWebToken (JWT) - logged in right away in the front end

      const payload = {
        user: {
          id: user.id
        }
      };

      // Once user signed in, the response will be the token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
