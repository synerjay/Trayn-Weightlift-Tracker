const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Initialize Middleware - You don't need to do bodyParser middlewre anymore.
//You can use a method within express to do parse a request body
//For example:

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running now bitch!!'));

//Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
