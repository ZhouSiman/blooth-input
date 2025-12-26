/**
 * 设备模型单元测试
 */
const Device = require('../../src/models/Device');

describe('Device Model', () => {
  test('应该创建设备实例', () => {
    const device = new Device('1', 'Test Device', 'TCP', 'online');

    expect(device.id).toBe('1');
    expect(device.name).toBe('Test Device');
    expect(device.protocol).toBe('TCP');
    expect(device.status).toBe('online');
  });

  test('应该更新设备状态', () => {
    const device = new Device('1', 'Test Device', 'TCP');
    const oldUpdatedAt = device.updatedAt;

    device.updateStatus('online');

    expect(device.status).toBe('online');
    expect(device.updatedAt).not.toBe(oldUpdatedAt);
  });

  test('应该设置元数据', () => {
    const device = new Device('1', 'Test Device', 'TCP');

    device.setMetadata('temperature', 25);
    device.setMetadata('humidity', 60);

    expect(device.metadata.temperature).toBe(25);
    expect(device.metadata.humidity).toBe(60);
  });

  test('应该正确序列化为JSON', () => {
    const device = new Device('1', 'Test Device', 'TCP');
    const json = device.toJSON();

    expect(json).toHaveProperty('id');
    expect(json).toHaveProperty('name');
    expect(json).toHaveProperty('protocol');
    expect(json).toHaveProperty('status');
    expect(json).toHaveProperty('createdAt');
    expect(json).toHaveProperty('updatedAt');
  });
});
