/**
 * 常量文件
 */

const PROTOCOLS = {
  TCP: 'TCP',
  UDP: 'UDP',
  MQTT: 'MQTT',
  HTTP: 'HTTP',
  WEBSOCKET: 'WebSocket',
  MODBUS: 'Modbus',
  COAP: 'CoAP',
};

const DEVICE_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  CONNECTING: 'connecting',
  ERROR: 'error',
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  PROTOCOLS,
  DEVICE_STATUS,
  HTTP_STATUS,
};
