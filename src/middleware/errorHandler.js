/**
 * 错误处理中间件
 */

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

/**
 * 错误处理中间件
 */
const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // 记录错误
  if (statusCode >= 500) {
    console.error('[ERROR]', err);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 异步处理包装器 - 用于处理 async/await 错误
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  ApiError,
  errorHandler,
  asyncHandler,
};
