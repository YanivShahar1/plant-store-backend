// middleware/verifyAdminToken.js
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyAdminToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw createError(401, 'Access Denied. No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!decoded.isAdmin) {
      throw createError(403, 'Admin access required');
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(createError(403, 'Invalid token'));
    } else if (error.name === 'TokenExpiredError') {
      next(createError(401, 'Token expired'));
    } else {
      next(error);
    }
  }
};

module.exports = verifyAdminToken;