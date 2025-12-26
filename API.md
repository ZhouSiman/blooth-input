# API 文档

## 基础信息
- **基础 URL:** `http://localhost:3000/api`
- **内容类型:** `application/json`
- **字符编码:** `UTF-8`

## 通用响应格式

所有 API 响应都遵循以下格式：

### 成功响应
```json
{
  "success": true,
  "data": {},
  "message": "操作成功"
}
```

### 错误响应
```json
{
  "success": false,
  "error": "错误信息",
  "timestamp": "2025-12-26T10:30:00.000Z"
}
```

## 设备管理 API

### 1. 获取所有设备
**端点:** `GET /devices`

**参数:** 无

**示例请求:**
```bash
curl http://localhost:3000/api/devices
```

**示例响应:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1234567890",
      "name": "设备1",
      "protocol": "TCP",
      "status": "online",
      "ip": "192.168.1.100",
      "port": 8080,
      "lastSeen": "2025-12-26T10:30:00.000Z",
      "createdAt": "2025-12-26T10:00:00.000Z",
      "updatedAt": "2025-12-26T10:30:00.000Z",
      "metadata": {}
    }
  ],
  "count": 1
}
```

---

### 2. 获取设备统计信息
**端点:** `GET /devices/stats`

**参数:** 无

**示例请求:**
```bash
curl http://localhost:3000/api/devices/stats
```

**示例响应:**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "online": 3,
    "offline": 2,
    "protocols": ["TCP", "MQTT", "HTTP"]
  }
}
```

---

### 3. 获取设备详情
**端点:** `GET /devices/:id`

**参数:**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 设备ID (路径参数) |

**示例请求:**
```bash
curl http://localhost:3000/api/devices/1234567890
```

**示例响应:**
```json
{
  "success": true,
  "data": {
    "id": "1234567890",
    "name": "设备1",
    "protocol": "TCP",
    "status": "online",
    "ip": "192.168.1.100",
    "port": 8080,
    "lastSeen": "2025-12-26T10:30:00.000Z",
    "createdAt": "2025-12-26T10:00:00.000Z",
    "updatedAt": "2025-12-26T10:30:00.000Z",
    "metadata": {}
  }
}
```

**错误响应 (404):**
```json
{
  "success": false,
  "error": "设备不存在"
}
```

---

### 4. 创建设备
**端点:** `POST /devices`

**请求体:**
```json
{
  "name": "新设备",
  "protocol": "TCP",
  "status": "online",
  "ip": "192.168.1.101",
  "port": 8081
}
```

**必填字段:**
- `name` (string): 设备名称
- `protocol` (string): 协议类型

**可选字段:**
- `status` (string): 设备状态 (默认: "offline")
- `ip` (string): IP地址
- `port` (number): 端口号 (0-65535)

**示例请求:**
```bash
curl -X POST http://localhost:3000/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "name": "传感器1",
    "protocol": "MQTT",
    "status": "online",
    "ip": "192.168.1.200",
    "port": 1883
  }'
```

**示例响应:**
```json
{
  "success": true,
  "data": {
    "id": "1234567891",
    "name": "传感器1",
    "protocol": "MQTT",
    "status": "online",
    "ip": "192.168.1.200",
    "port": 1883,
    "lastSeen": "2025-12-26T10:35:00.000Z",
    "createdAt": "2025-12-26T10:35:00.000Z",
    "updatedAt": "2025-12-26T10:35:00.000Z",
    "metadata": {}
  }
}
```

**错误响应 (400):**
```json
{
  "success": false,
  "error": "名称和协议是必需的"
}
```

---

### 5. 更新设备
**端点:** `PUT /devices/:id`

**参数:**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 设备ID (路径参数) |

**请求体:**
```json
{
  "status": "offline",
  "ip": "192.168.1.102"
}
```

**示例请求:**
```bash
curl -X PUT http://localhost:3000/api/devices/1234567890 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "offline"
  }'
```

**示例响应:**
```json
{
  "success": true,
  "data": {
    "id": "1234567890",
    "name": "设备1",
    "protocol": "TCP",
    "status": "offline",
    "ip": "192.168.1.100",
    "port": 8080,
    "lastSeen": "2025-12-26T10:40:00.000Z",
    "createdAt": "2025-12-26T10:00:00.000Z",
    "updatedAt": "2025-12-26T10:40:00.000Z",
    "metadata": {}
  }
}
```

---

### 6. 删除设备
**端点:** `DELETE /devices/:id`

**参数:**
| 参数 | 类型 | 说明 |
|------|------|------|
| id | string | 设备ID (路径参数) |

**示例请求:**
```bash
curl -X DELETE http://localhost:3000/api/devices/1234567890
```

**示例响应:**
```json
{
  "success": true,
  "message": "设备已删除",
  "data": {
    "id": "1234567890",
    "name": "设备1",
    "protocol": "TCP",
    "status": "offline",
    "ip": "192.168.1.100",
    "port": 8080,
    "lastSeen": "2025-12-26T10:40:00.000Z",
    "createdAt": "2025-12-26T10:00:00.000Z",
    "updatedAt": "2025-12-26T10:40:00.000Z",
    "metadata": {}
  }
}
```

---

## 系统 API

### 健康检查
**端点:** `GET /health`

**参数:** 无

**示例请求:**
```bash
curl http://localhost:3000/api/health
```

**示例响应:**
```json
{
  "success": true,
  "status": "running",
  "timestamp": "2025-12-26T10:30:00.000Z",
  "environment": "development"
}
```

---

## 协议类型支持
- TCP
- UDP
- MQTT
- HTTP
- WebSocket
- Modbus
- CoAP

## 设备状态
- online: 在线
- offline: 离线
- connecting: 连接中
- error: 错误

## 错误代码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 测试 API

你可以使用 Postman、curl 或其他 HTTP 工具测试 API。

### 使用 Postman
1. 创建新的 Request
2. 选择 HTTP 方法 (GET, POST, PUT, DELETE)
3. 输入端点 URL
4. 添加必要的请求头和请求体
5. 点击 Send

### 使用 curl
详见上方各接口的 "示例请求" 部分。
