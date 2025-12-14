const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies.token;
  let token;

  // Accept both Authorization header and cookie
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (authHeader && typeof authHeader === 'string' && !authHeader.startsWith('Bearer ')) {
    token = authHeader;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // { email, userId }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};
