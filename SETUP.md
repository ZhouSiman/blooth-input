# 项目启动指南

## 环境准备

### 1. 安装 Node.js
前往 [Node.js 官网](https://nodejs.org/) 下载并安装最新的 LTS 版本。

验证安装：
```bash
node --version
npm --version
```

### 2. 克隆项目
```bash
git clone https://github.com/ZhouSiman/blooth-input.git
cd blooth-input
```

## 初始化步骤

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
```bash
# 复制示例文件
cp .env.example .env

# 编辑 .env 文件配置必要参数
```

**.env 文件示例:**
```env
# 服务器配置
PORT=3000
NODE_ENV=development

# 设备配置
DEVICE_TIMEOUT=5000
MAX_CONNECTIONS=100

# 协议设置
PROTOCOL_VERSION=1.0
ENABLE_DEBUG=true
```

### 3. 运行项目

**开发模式（推荐）:**
```bash
npm run dev
```

启动后在浏览器中访问：http://localhost:3000

**生产模式:**
```bash
npm start
```

## 常用命令

### 开发相关
```bash
# 启动开发服务器（支持热重载）
npm run dev

# 运行应用
npm start

# 检查代码规范
npm run lint

# 自动修复代码规范问题
npm run lint:fix

# 格式化代码
npm run format
```

### 测试相关
```bash
# 运行所有测试
npm test

# 监视模式运行测试（自动重新运行）
npm run test:watch

# 生成测试覆盖率报告
npm run test:coverage
```

## 验证安装

安装完成后，可以通过以下方式验证项目是否正常运行：

### 1. 检查服务器
访问 http://localhost:3000 应该看到项目主页面

### 2. 健康检查
```bash
curl http://localhost:3000/api/health
```

预期响应：
```json
{
  "success": true,
  "status": "running",
  "timestamp": "2025-12-26T10:30:00.000Z",
  "environment": "development"
}
```

### 3. 测试 API
```bash
# 获取设备列表
curl http://localhost:3000/api/devices

# 创建设备
curl -X POST http://localhost:3000/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试设备",
    "protocol": "TCP"
  }'
```

## 项目结构说明

```
blooth-input/
├── src/                     # 源代码
│   ├── controllers/         # 业务逻辑控制器
│   ├── models/             # 数据模型定义
│   ├── routes/             # API 路由定义
│   └── utils/              # 工具函数和常量
├── tests/                   # 测试文件
├── public/                  # 静态资源存放
├── logs/                    # 应用日志存放
├── index.js                 # 应用入口
├── package.json             # 项目依赖配置
├── .env.example             # 环境变量示例
├── .gitignore              # Git 忽略配置
├── Dockerfile              # Docker 构建文件
└── docker-compose.yml      # Docker Compose 配置
```

## 常见问题

### 问题 1: 端口已被占用
**错误信息:** `Error: listen EADDRINUSE: address already in use :::3000`

**解决方案:**
- 修改 `.env` 文件中的 `PORT` 值
- 或者关闭占用 3000 端口的其他应用

### 问题 2: 依赖安装失败
**解决方案:**
```bash
# 清除缓存
npm cache clean --force

# 重新安装
npm install
```

### 问题 3: 模块不存在
**解决方案:**
```bash
# 确保所有依赖已安装
npm install

# 检查 package.json 中的依赖是否齐全
```

## 开发工作流

### 1. 创建功能分支
```bash
git checkout -b feature/新功能名称
```

### 2. 开发和测试
```bash
# 启动开发服务器
npm run dev

# 运行测试
npm test
```

### 3. 代码检查和格式化
```bash
npm run lint:fix
npm run format
```

### 4. 提交更改
```bash
git add .
git commit -m "feat: 添加新功能"
git push origin feature/新功能名称
```

## 部署

### Docker 部署
```bash
# 构建镜像
docker build -t blooth-input:1.0.0 .

# 运行容器
docker run -p 3000:3000 --env-file .env blooth-input:1.0.0

# 使用 Docker Compose
docker-compose up -d
```

### 检查日志
日志文件位于 `logs/` 目录：
- `INFO-日期.log` - 信息日志
- `ERROR-日期.log` - 错误日志
- `WARN-日期.log` - 警告日志

## 获取帮助

- 查看 [README.md](./README.md) 了解项目概览
- 查看 [API.md](./API.md) 了解 API 文档
- 查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解贡献指南

## 联系方式
如有问题，请提交 Issue 或 Pull Request。
