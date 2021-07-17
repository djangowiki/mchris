const asyncHandler = require('../middlewares/async');
const User = require('../models/User');

exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({ success: true, data: user });
});
