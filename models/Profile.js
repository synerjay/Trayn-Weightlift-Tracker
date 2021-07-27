const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['resistance', 'cardio'],
    required: "Valid options are 'resistance' or 'cardio'",
  },
  name: {
    type: String,
    trim: true,
    required: 'Enter a name for the exercise',
  },
  duration: {
    type: Number,
    required: 'Enter the duration minutes',
  },
  weight: {
    type: Number,
    required: isRequired('weight'),
  },
  reps: {
    type: Number,
    required: isRequired('reps'),
  },
  sets: {
    type: Number,
    required: isRequired('sets'),
  },
  distance: {
    type: Number,
    required: isRequired('distance'),
  },
});

function isRequired(field) {
  return function () {
    if (field == 'distance') {
      return this.type === 'cardio';
    } else {
      return this.type === 'resistance';
    }
  };
}

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // special type that corresponds to the special id mongoose assigns to each user info in the database
    ref: 'user', // this is reference to the user model of mongoose
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  workout: [
    {
      day: {
        type: Date,
        default: Date.now,
      },
      exercises: [exerciseSchema],
    },
  ],
  // experience: [
  //   {
  //     title: {
  //       type: String,
  //       required: true,
  //     },
  //     company: {
  //       type: String,
  //       required: true,
  //     },
  //     location: {
  //       type: String,
  //     },
  //     from: {
  //       type: Date,
  //       required: true,
  //     },
  //     to: {
  //       type: Date,
  //     },
  //     current: {
  //       type: Boolean,
  //       default: false,
  //     },
  //     description: {
  //       type: String,
  //     },
  //   },
  // ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
