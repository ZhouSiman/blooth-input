/**
 * 验证工具
 */

const validators = {
  /**
   * 验证设备数据
   */
  validateDevice: (data) => {
    const errors = [];

    if (!data.name || typeof data.name !== 'string') {
      errors.push('设备名称必须是字符串');
    }

    if (!data.protocol || typeof data.protocol !== 'string') {
      errors.push('协议必须是字符串');
    }

    if (data.port && (typeof data.port !== 'number' || data.port < 0 || data.port > 65535)) {
      errors.push('端口号必须在 0-65535 之间');
    }

    if (data.ip && !validators.isValidIP(data.ip)) {
      errors.push('IP 地址无效');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * 验证 IP 地址
   */
  isValidIP: (ip) => {
    const ipv4Regex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    return ipv4Regex.test(ip);
  },

  /**
   * 验证端口号
   */
  isValidPort: (port) => {
    return typeof port === 'number' && port > 0 && port < 65536;
  },
};

module.exports = validators;
