/**
 * 设备控制器单元测试
 */
const request = require('supertest');
const express = require('express');
const deviceController = require('../../src/controllers/deviceController');

describe('Device Controller', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.get('/api/devices', deviceController.getDevices);
    app.post('/api/devices', deviceController.createDevice);
    app.get('/api/devices/stats', deviceController.getDeviceStats);
    app.get('/api/devices/:id', deviceController.getDeviceById);
    app.put('/api/devices/:id', deviceController.updateDevice);
    app.delete('/api/devices/:id', deviceController.deleteDevice);
  });

  describe('GET /api/devices', () => {
    test('应该返回设备列表', async () => {
      const res = await request(app).get('/api/devices');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/devices/stats', () => {
    test('应该返回设备统计信息', async () => {
      const res = await request(app).get('/api/devices/stats');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('total');
      expect(res.body.data).toHaveProperty('online');
      expect(res.body.data).toHaveProperty('offline');
    });
  });

  describe('POST /api/devices', () => {
    test('应该创建新设备', async () => {
      const newDevice = {
        name: 'Test Device',
        protocol: 'TCP',
      };

      const res = await request(app).post('/api/devices').send(newDevice);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Test Device');
      expect(res.body.data.protocol).toBe('TCP');
    });

    test('创建设备时缺少必填字段应该失败', async () => {
      const invalidDevice = {
        name: 'Test Device',
      };

      const res = await request(app).post('/api/devices').send(invalidDevice);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('创建设备时请求体为空应该失败', async () => {
      const res = await request(app).post('/api/devices').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/devices/:id', () => {
    test('获取不存在的设备应该返回 404', async () => {
      const res = await request(app).get('/api/devices/nonexistent');

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });

    test('应该获取存在的设备详情', async () => {
      // 先创建一个设备
      const createRes = await request(app).post('/api/devices').send({
        name: 'Device for Get',
        protocol: 'MQTT',
      });

      const deviceId = createRes.body.data.id;

      // 然后获取它
      const res = await request(app).get(`/api/devices/${deviceId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(deviceId);
    });
  });

  describe('PUT /api/devices/:id', () => {
    test('应该更新设备信息', async () => {
      // 先创建一个设备
      const createRes = await request(app).post('/api/devices').send({
        name: 'Original Name',
        protocol: 'TCP',
      });

      const deviceId = createRes.body.data.id;

      // 更新设备
      const updateRes = await request(app).put(`/api/devices/${deviceId}`).send({
        name: 'Updated Name',
        status: 'online',
      });

      expect(updateRes.statusCode).toBe(200);
      expect(updateRes.body.success).toBe(true);
      expect(updateRes.body.data.name).toBe('Updated Name');
      expect(updateRes.body.data.status).toBe('online');
    });
  });

  describe('DELETE /api/devices/:id', () => {
    test('应该删除设备', async () => {
      // 先创建一个设备
      const createRes = await request(app).post('/api/devices').send({
        name: 'Device to Delete',
        protocol: 'TCP',
      });

      const deviceId = createRes.body.data.id;

      // 删除设备
      const deleteRes = await request(app).delete(`/api/devices/${deviceId}`);

      expect(deleteRes.statusCode).toBe(200);
      expect(deleteRes.body.success).toBe(true);

      // 验证设备已删除
      const getRes = await request(app).get(`/api/devices/${deviceId}`);

      expect(getRes.statusCode).toBe(404);
    });

    test('删除不存在的设备应该返回 404', async () => {
      const res = await request(app).delete('/api/devices/nonexistent');

      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
