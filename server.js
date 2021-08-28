const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Initialize Middleware - You don't need to do bodyParser middlewre anymore.
//You can use a method within express to do parse a request body
//For example:

app.use(express.json({ extended: false }));

//Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/workout', require('./routes/api/workout'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
