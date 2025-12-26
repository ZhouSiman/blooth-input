/**
 * 请求日志中间件
 */
const logger = require('../utils/logger');

/**
 * 请求日志中间件
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // 记录响应
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    };

    if (res.statusCode >= 400) {
      logger.warn(`${req.method} ${req.path} - ${res.statusCode}`, logData);
    } else {
      logger.info(`${req.method} ${req.path} - ${res.statusCode}`, logData);
    }

    return originalSend.call(this, data);
  };

  next();
};

module.exports = {
  requestLogger,
};
