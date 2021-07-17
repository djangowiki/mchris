const ErrorResponse = require('../helpers/errorResponse');

const errorHandler = (err, req, res, next) => {
  // Dev Log.
  console.error(err);

  // Catch Duplicate Error
  if (err.code === 11000) {
    err = new ErrorResponse('Duplicate Field Error', 400);
  }

  // Catch MongoDB CastError.
  if (err.name === 'CastError') {
    err = new ErrorResponse(
      `Resource with the id ${err.value} does not exist`,
      400
    );
  }

  //Catch ValidationError
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    err = new ErrorResponse(message, 400);
  }
  // Default Api Error Response
  res.status(500).json({ success: false, data: err.message || 'Server Error' });
};

module.exports = errorHandler;
