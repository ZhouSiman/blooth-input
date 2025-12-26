# Device Sentinel PRO | 智能多协议分流系统

## 项目描述
Device Sentinel PRO 是一个智能多协议分流系统，支持多种设备接入和协议转换。提供实时监控、设备管理、数据分流等功能。

## 项目结构
```
blooth-input/
├── src/                      # 源代码目录
│   ├── controllers/          # 控制器层
│   ├── models/              # 数据模型
│   ├── routes/              # 路由定义
│   └── utils/               # 工具函数
├── tests/                    # 测试文件
├── public/                   # 静态资源
├── logs/                     # 应用日志
├── main.html                 # 前端页面
├── index.js                  # 后端入口
├── package.json              # 项目配置
├── .env.example              # 环境变量示例
├── Dockerfile                # Docker 配置
└── docker-compose.yml        # Docker Compose 配置
```

## 功能特性
- ✅ 多协议支持 (TCP, UDP, MQTT, HTTP, WebSocket, Modbus, CoAP)
- ✅ 设备实时监控与管理
- ✅ 完整的 CRUD API
- ✅ 设备统计与分析
- ✅ 日志记录与存储
- ✅ RESTful API 设计
- ✅ 错误处理与验证
- ✅ 玻璃拟态设计界面

## 前置要求
- Node.js >= 14.0
- npm 或 yarn
- Docker (可选)

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env
```

编辑 `.env` 文件配置必要的环境变量：
```env
PORT=3000
NODE_ENV=development
ENABLE_DEBUG=true
```

### 3. 运行项目
**开发模式：**
```bash
npm run dev
```

**生产模式：**
```bash
npm start
```

### 4. 访问应用
- 前端页面: http://localhost:3000
- API 文档见下方

## API 文档

### 设备管理接口

#### 获取所有设备
```http
GET /api/devices
```
**响应:**
```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

#### 获取设备统计信息
```http
GET /api/devices/stats
```
**响应:**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "online": 3,
    "offline": 2,
    "protocols": ["TCP", "MQTT"]
  }
}
```

#### 创建设备
```http
POST /api/devices
Content-Type: application/json

{
  "name": "Device1",
  "protocol": "TCP",
  "status": "online",
  "ip": "192.168.1.100",
  "port": 8080
}
```

#### 获取设备详情
```http
GET /api/devices/:id
```

#### 更新设备
```http
PUT /api/devices/:id
Content-Type: application/json

{
  "status": "offline",
  "ip": "192.168.1.101"
}
```

#### 删除设备
```http
DELETE /api/devices/:id
```

### 系统接口

#### 健康检查
```http
GET /api/health
```

## 开发指南

### 运行测试
```bash
npm test
```

### 代码检查
```bash
npm run lint
```

### 自动修复代码
```bash
npm run lint:fix
```

### 代码格式化
```bash
npm run format
```

### 生成测试覆盖率报告
```bash
npm run test:coverage
```

## Docker 部署

### 构建镜像
```bash
docker build -t blooth-input:latest .
```

### 运行容器
```bash
docker run -p 3000:3000 --env-file .env blooth-input:latest
```

### 使用 Docker Compose
```bash
docker-compose up -d
```

## 项目依赖

### 核心依赖
- express: Web 框架
- cors: 跨域资源共享
- dotenv: 环境变量管理
- uuid: UUID 生成

### 开发依赖
- nodemon: 开发热重载
- jest: 测试框架
- supertest: HTTP 断言库
- eslint: 代码规范检查
- prettier: 代码格式化

## 日志管理
日志文件存储在 `logs/` 目录下，按日期和级别分类：
- `INFO-YYYY-MM-DD.log`: 信息日志
- `ERROR-YYYY-MM-DD.log`: 错误日志
- `WARN-YYYY-MM-DD.log`: 警告日志
- `DEBUG-YYYY-MM-DD.log`: 调试日志

## 配置说明

### 环境变量
| 变量 | 说明 | 默认值 |
|------|------|-------|
| PORT | 服务器端口 | 3000 |
| NODE_ENV | 运行环境 | development |
| ENABLE_DEBUG | 是否启用调试 | false |
| DEVICE_TIMEOUT | 设备超时时间(ms) | 5000 |
| MAX_CONNECTIONS | 最大连接数 | 100 |

## 开发说明
详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 许可证
MIT

## 联系方式
作者: ZhouSiman
项目地址: https://github.com/ZhouSiman/blooth-input