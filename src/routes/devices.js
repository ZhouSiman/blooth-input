/**
 * 设备管理路由
 */
const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const { validateRequest } = require('../middleware/validators');
const { asyncHandler } = require('../middleware/errorHandler');

// 获取所有设备
router.get('/', asyncHandler(deviceController.getDevices));

// 搜索设备
router.get('/search', asyncHandler(deviceController.searchDevices));

// 获取设备统计信息
router.get('/stats', asyncHandler(deviceController.getDeviceStats));

// 导出设备数据
router.get('/export', asyncHandler(deviceController.exportDevices));

// 获取设备详情
router.get('/:id', asyncHandler(deviceController.getDeviceById));

// 创建设备
router.post(
  '/',
  validateRequest({ requireName: true, requireProtocol: true }),
  asyncHandler(deviceController.createDevice)
);

// 批量删除设备
router.post('/batch/delete', asyncHandler(deviceController.deleteDevices));

// 批量更新设备状态
router.post('/batch/status', asyncHandler(deviceController.updateDevicesStatus));

// 更新设备
router.put('/:id', asyncHandler(deviceController.updateDevice));

// 删除设备
router.delete('/:id', asyncHandler(deviceController.deleteDevice));

module.exports = router;
