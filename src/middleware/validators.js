/**
 * 请求验证中间件
 */
const { ApiError } = require('./errorHandler');

/**
 * 验证请求体的中间件工厂函数
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    const errors = [];

    // 验证名称
    if (
      schema.requireName &&
      (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim() === '')
    ) {
      errors.push('设备名称是必需的且必须是非空字符串');
    }

    // 验证协议
    if (schema.requireProtocol && (!req.body.protocol || typeof req.body.protocol !== 'string')) {
      errors.push('协议是必需的且必须是字符串');
    }

    // 验证 IP 地址（如果提供）
    if (req.body.ip) {
      const ipRegex =
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
      if (!ipRegex.test(req.body.ip)) {
        errors.push('IP 地址格式无效');
      }
    }

    // 验证端口（如果提供）
    if (req.body.port !== undefined) {
      const port = Number(req.body.port);
      if (!Number.isInteger(port) || port < 0 || port > 65535) {
        errors.push('端口号必须在 0-65535 之间的整数');
      }
    }

    // 验证状态（如果提供）
    if (req.body.status) {
      const validStatuses = ['online', 'offline', 'connecting', 'error'];
      if (!validStatuses.includes(req.body.status)) {
        errors.push(`状态必须是以下之一: ${validStatuses.join(', ')}`);
      }
    }

    if (errors.length > 0) {
      throw new ApiError(400, errors.join('; '));
    }

    next();
  };
};

module.exports = {
  validateRequest,
};
