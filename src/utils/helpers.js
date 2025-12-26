/**
 * 通用工具函数
 */

/**
 * 延迟函数
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 对象深拷贝
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map((item) => deepClone(item));
  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * 分页计算
 */
const paginate = (items, page = 1, pageSize = 10) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    data: items.slice(start, end),
    page,
    pageSize,
    total: items.length,
    pages: Math.ceil(items.length / pageSize),
  };
};

/**
 * 格式化文件大小
 */
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * 生成唯一 ID
 */
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 验证邮箱
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 验证 URL
 */
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 获取今天的日期
 */
const getToday = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

/**
 * 获取上周的日期范围
 */
const getLastWeek = () => {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return {
    start: lastWeek.toISOString().split('T')[0],
    end: today.toISOString().split('T')[0],
  };
};

/**
 * 获取上个月的日期范围
 */
const getLastMonth = () => {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
  return {
    start: lastMonth.toISOString().split('T')[0],
    end: monthEnd.toISOString().split('T')[0],
  };
};

/**
 * 排序数组
 */
const sortBy = (arr, key, order = 'asc') => {
  return [...arr].sort((a, b) => {
    if (order === 'desc') {
      return b[key] > a[key] ? 1 : -1;
    }
    return a[key] > b[key] ? 1 : -1;
  });
};

/**
 * 按条件分组
 */
const groupBy = (arr, key) => {
  return arr.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

module.exports = {
  delay,
  deepClone,
  paginate,
  formatFileSize,
  generateId,
  isValidEmail,
  isValidUrl,
  getToday,
  getLastWeek,
  getLastMonth,
  sortBy,
  groupBy,
};
