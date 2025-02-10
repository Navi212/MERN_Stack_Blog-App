// Implements custom error handler class
class AppError extends Error {
  constructor(message, statusCode) {
    // Calling super to give access to parent class
    // message formatting
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    // Excludes this class (AppError) internal implementation
    // in the stackTrace.
    // Should capture only stackTrace from the error point
    AppError.captureStackTrace(this, this.constructor);
  }
}

// Async handler will wrap all async route functions
// with the aim to eliminate writting long/repetitive
// try-catch statements in routes
function asyncHandler(asyncFn) {
  // Returns an asyn middleware
  return async (req, res, next) => {
    try {
      // asyncFn represents the function to be wrapped
      // (in the route handler)
      await asyncFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { AppError, asyncHandler };
