const jwt = require('jsonwebtoken');
const secretKey = 'asdfghj1233334';

function generateToken(payload, expiresIn) {
  return jwt.sign(payload, secretKey, { expiresIn });
}


const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};

module.exports = { generateToken, verifyToken };