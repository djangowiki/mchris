import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from '../middlewares/async.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      // Fetch the user with the decoded id from the jwt
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error('Not Authorized, Token Failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
