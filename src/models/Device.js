/**
 * 设备模型
 */

class Device {
  constructor(id, name, protocol, status = 'offline') {
    this.id = id;
    this.name = name;
    this.protocol = protocol;
    this.status = status;
    this.ip = null;
    this.port = null;
    this.description = '';
    this.version = '1.0.0';
    this.lastSeen = new Date();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.metadata = {};
    this.capabilities = [];
    this.tags = [];
  }

  updateStatus(status) {
    const validStatuses = ['online', 'offline', 'connecting', 'error'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }
    this.status = status;
    this.lastSeen = new Date();
    this.updatedAt = new Date();
  }

  setMetadata(key, value) {
    this.metadata[key] = value;
    this.updatedAt = new Date();
  }

  getMetadata(key) {
    return this.metadata[key];
  }

  addCapability(capability) {
    if (!this.capabilities.includes(capability)) {
      this.capabilities.push(capability);
      this.updatedAt = new Date();
    }
  }

  removeCapability(capability) {
    const index = this.capabilities.indexOf(capability);
    if (index > -1) {
      this.capabilities.splice(index, 1);
      this.updatedAt = new Date();
    }
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.updatedAt = new Date();
    }
  }

  removeTag(tag) {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
      this.updatedAt = new Date();
    }
  }

  isOnline() {
    return this.status === 'online';
  }

  isOffline() {
    return this.status === 'offline';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      protocol: this.protocol,
      status: this.status,
      ip: this.ip,
      port: this.port,
      description: this.description,
      version: this.version,
      lastSeen: this.lastSeen,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      metadata: this.metadata,
      capabilities: this.capabilities,
      tags: this.tags,
    };
  }

  toString() {
    return `Device(${this.id}: ${this.name} - ${this.status})`;
  }

  /**
   * 从 JSON 数据创建 Device 实例
   */
  static fromJSON(data) {
    const device = new Device(data.id, data.name, data.protocol, data.status);
    if (data.ip) device.ip = data.ip;
    if (data.port) device.port = data.port;
    if (data.description) device.description = data.description;
    if (data.version) device.version = data.version;
    if (data.metadata) device.metadata = data.metadata;
    if (data.capabilities) device.capabilities = data.capabilities;
    if (data.tags) device.tags = data.tags;
    if (data.createdAt) device.createdAt = new Date(data.createdAt);
    if (data.updatedAt) device.updatedAt = new Date(data.updatedAt);
    return device;
  }
}

module.exports = Device;
