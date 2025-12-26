/**
 * 设备控制器
 */
const logger = require('../utils/logger');
const Device = require('../models/Device');

// 内存存储（实际应用中应使用数据库）
let devices = [];

// 获取所有设备
exports.getDevices = (req, res) => {
  try {
    logger.info('获取所有设备');
    res.json({
      success: true,
      data: devices,
      count: devices.length,
    });
  } catch (error) {
    logger.error('获取设备失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 获取设备详情
exports.getDeviceById = (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`获取设备详情: ${id}`);

    const device = devices.find((d) => d.id === id);
    if (!device) {
      return res.status(404).json({
        success: false,
        error: '设备不存在',
      });
    }

    res.json({
      success: true,
      data: device,
    });
  } catch (error) {
    logger.error('获取设备详情失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 创建设备
exports.createDevice = (req, res) => {
  try {
    const { name, protocol, status } = req.body;

    // 验证必填字段
    if (!name || !protocol) {
      return res.status(400).json({
        success: false,
        error: '名称和协议是必需的',
      });
    }

    const device = new Device(Date.now().toString(), name, protocol, status);
    devices.push(device);

    logger.info(`创建设备: ${name}`);
    res.status(201).json({
      success: true,
      data: device.toJSON(),
    });
  } catch (error) {
    logger.error('创建设备失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 更新设备
exports.updateDevice = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const deviceIndex = devices.findIndex((d) => d.id === id);
    if (deviceIndex === -1) {
      return res.status(404).json({
        success: false,
        error: '设备不存在',
      });
    }

    // 更新设备属性
    Object.assign(devices[deviceIndex], updateData, {
      updatedAt: new Date(),
    });

    logger.info(`更新设备: ${id}`);
    res.json({
      success: true,
      data: devices[deviceIndex].toJSON(),
    });
  } catch (error) {
    logger.error('更新设备失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 删除设备
exports.deleteDevice = (req, res) => {
  try {
    const { id } = req.params;

    const deviceIndex = devices.findIndex((d) => d.id === id);
    if (deviceIndex === -1) {
      return res.status(404).json({
        success: false,
        error: '设备不存在',
      });
    }

    const deletedDevice = devices.splice(deviceIndex, 1);
    logger.info(`删除设备: ${id}`);

    res.json({
      success: true,
      message: '设备已删除',
      data: deletedDevice[0].toJSON(),
    });
  } catch (error) {
    logger.error('删除设备失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 批量获取设备状态
exports.getDeviceStats = (req, res) => {
  try {
    const stats = {
      total: devices.length,
      online: devices.filter((d) => d.status === 'online').length,
      offline: devices.filter((d) => d.status === 'offline').length,
      connecting: devices.filter((d) => d.status === 'connecting').length,
      error: devices.filter((d) => d.status === 'error').length,
      protocols: [...new Set(devices.map((d) => d.protocol))],
      protocolDetails: {},
    };

    // 按协议分类统计
    devices.forEach((device) => {
      if (!stats.protocolDetails[device.protocol]) {
        stats.protocolDetails[device.protocol] = 0;
      }
      stats.protocolDetails[device.protocol]++;
    });

    logger.info('获取设备统计');
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('获取统计信息失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 批量删除设备
exports.deleteDevices = (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'ids 必须是非空数组',
      });
    }

    const deletedCount = devices.filter((d) => ids.includes(d.id)).length;
    devices = devices.filter((d) => !ids.includes(d.id));

    logger.info(`批量删除设备，删除数量: ${deletedCount}`);
    res.json({
      success: true,
      message: `已删除 ${deletedCount} 个设备`,
      deletedCount,
    });
  } catch (error) {
    logger.error('批量删除设备失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 批量更新设备状态
exports.updateDevicesStatus = (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'ids 必须是非空数组',
      });
    }

    const validStatuses = ['online', 'offline', 'connecting', 'error'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `状态必须是以下之一: ${validStatuses.join(', ')}`,
      });
    }

    let updatedCount = 0;
    devices.forEach((device) => {
      if (ids.includes(device.id)) {
        device.updateStatus(status);
        updatedCount++;
      }
    });

    logger.info(`批量更新设备状态，更新数量: ${updatedCount}, 新状态: ${status}`);
    res.json({
      success: true,
      message: `已更新 ${updatedCount} 个设备状态`,
      updatedCount,
    });
  } catch (error) {
    logger.error('批量更新设备状态失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 搜索设备
exports.searchDevices = (req, res) => {
  try {
    const { keyword, protocol, status } = req.query;

    let results = devices;

    // 按名称搜索
    if (keyword) {
      results = results.filter((d) => d.name.toLowerCase().includes(keyword.toLowerCase()));
    }

    // 按协议筛选
    if (protocol) {
      results = results.filter((d) => d.protocol === protocol);
    }

    // 按状态筛选
    if (status) {
      results = results.filter((d) => d.status === status);
    }

    logger.info(`搜索设备，关键词: ${keyword || '无'}, 找到: ${results.length}`);
    res.json({
      success: true,
      data: results,
      count: results.length,
    });
  } catch (error) {
    logger.error('搜索设备失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// 导出设备数据
exports.exportDevices = (req, res) => {
  try {
    const format = req.query.format || 'json';

    if (format === 'csv') {
      // CSV 格式
      const csv = [
        'ID,名称,协议,状态,IP,端口,创建时间,最后更新',
        ...devices.map(
          (d) =>
            `${d.id},"${d.name}",${d.protocol},${d.status},${d.ip || 'N/A'},${
              d.port || 'N/A'
            },${d.createdAt},${d.updatedAt}`
        ),
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=devices.csv');
      res.send(csv);
    } else {
      // JSON 格式（默认）
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=devices.json');
      res.send(JSON.stringify(devices, null, 2));
    }

    logger.info(`导出设备数据，格式: ${format}, 数量: ${devices.length}`);
  } catch (error) {
    logger.error('导出设备失败', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
