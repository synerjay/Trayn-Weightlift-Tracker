const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// For seeding purposes //
const MongoClient = require('mongodb').MongoClient;
const db = config.get('mongoURI');
var ObjectId = require('mongodb').ObjectId;

// ---- //

const { check, validationResult } = require('express-validator');

// Bring in the user model schema from Models folder to send user info
const User = require('../../models/User');

// @router  GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    // the req.user.id below is acquired from the JSON Web Token when it exists. Guest would NOT get a token
    const user = await User.findById(req.user.id).select('-password'); // -password means that the password from user info isnt being returned

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router  POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Step 1: See if user exists
      let user = await User.findOne({ email });

      //if there is no user, send  invalid message
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Bcrypt method of compare. If a user exists, compares password to password stored in database

      const isMatch = await bcrypt.compare(password, user.password); // Compare promise takes in password variable and user.password from database

      // if password doesn't match, send invalid message NOTE: no user or password is wrong MUST have the same error message for security purposes
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // if user is Guest, then seed the Database
      if (user.id == '6121e0ac68bd9e4e40b9d987') {
        const client = new MongoClient(db, {
          useNewUrlParser: true,
        });

        async function run() {
          try {
            await client.connect();
            const database = client.db('myFirstDatabase');
            const workouts = database.collection('workouts');

            // Query for all movies with the title "Santa Claus"
            const query = { user: new ObjectId(user.id) };
            const result = await workouts.deleteMany(query);
            console.log('Deleted ' + result.deletedCount + ' documents');

            // let workoutSeries = [
            //   new Workout({
            //     user: user.id,
            //     workoutName: 'Pull (Back, Biceps, Lats)',
            //     date: new Date('08 October 2021 14:48 UTC').toISOString(),
            //   }),
            //   new Workout({
            //     user: user.id,
            //     workoutName: 'Pull (Back, Biceps, Lats)',
            //     date: new Date('09 October 2021 14:48 UTC').toISOString(),
            //   }),
            //   new Workout({
            //     user: user.id,
            //     workoutName: 'Pull (Back, Biceps, Lats)',
            //     date: new Date('10 October 2021 14:48 UTC').toISOString(),
            //   }),
            // ];

            let workoutSeries = [];

            //  Do Loops Here:

            for (let i = 0; i < 25; i++) {
              let dt = new Date();
              let newWorkout = {
                user: user.id,
                workoutName: 'BACKKKKKKK',
                date: new Date().setDate(new Date().getDate() - i),
              };
              // for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
              //     let newEvent = {
              //         timestamp_event: faker.date.past(),
              //         weight: randomIntFromInterval(14,16),
              //     }
              //     newDay.events.push(newEvent);
              // }
              workoutSeries.push(new Workout(newWorkout));
            }

            workouts.insertMany(workoutSeries);
            console.log('Successfully seeded');
            //Payload

            const payload = {
              user: {
                id: user.id,
              },
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
          } finally {
            await client.close();
          }
        }
        return run().catch(console.dir);
      }

      //Payload

      const payload = {
        user: {
          id: user.id,
        },
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
