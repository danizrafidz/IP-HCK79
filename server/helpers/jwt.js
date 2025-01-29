const jwt = require('jsonwebtoken');
require('dotenv').config()

function signToken(payload) {
  let token = jwt.sign(payload, process.env.JWT_SECRET);
  return token
}

function verifyToken(token) {
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded
}

module.exports = { signToken, verifyToken }