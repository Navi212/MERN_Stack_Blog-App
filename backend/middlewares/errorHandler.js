/* eslint-disable no-unused-vars */
// Implements the loadable errorHandler middleware

// errorHandler middleware
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Entry already exists',
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('Running in development mode: ', err);
    return res.status(statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
  });
}

module.exports = { errorHandler };
