const jwt = require('jsonwebtoken');
const config = require('config');

// this middleware verifies the JWT token received and restricts access to requests that doesnt have the said token

module.exports = function(req, res, next) {
  // Get token from header of the request
  const token = req.header('x-auth-token');

  // Check if there are no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user; // user info is stored from the payload
    next(); // middleware always have this next function
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
