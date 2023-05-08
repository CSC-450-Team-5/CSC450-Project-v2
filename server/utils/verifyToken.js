require('dotenv').config();

const JsonWebToken = require('jsonwebtoken');
const SECRET_JWT_CODE = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401); // If there's no token, return an error response
  }

  try {
    const decoded = JsonWebToken.verify(token, SECRET_JWT_CODE);
    res.locals.user = decoded;
    next(); // Call the next middleware or the route handler
  } catch (err) {
    console.log('Error: ' + err);
    return res.sendStatus(403); // If the token is invalid, return an error response
  }
}

module.exports = verifyToken;