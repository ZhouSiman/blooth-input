# 快速参考

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm install` | 安装依赖 |
| `npm start` | 生产模式启动 |
| `npm run dev` | 开发模式启动 |
| `npm test` | 运行测试 |
| `npm run lint` | 检查代码规范 |
| `npm run lint:fix` | 修复代码规范 |
| `npm run format` | 格式化代码 |
| `docker-compose up` | Docker 启动 |

## 目录结构

```
blooth-input/
├── src/                    # 源代码
│   ├── controllers/        # 业务逻辑
│   ├── models/            # 数据模型
│   ├── routes/            # 路由定义
│   └── utils/             # 工具函数
├── tests/                  # 测试文件
├── public/                 # 静态资源
├── logs/                   # 日志文件
├── .github/               # GitHub 配置
│   └── workflows/         # CI/CD 工作流
├── index.js               # 应用入口
├── package.json           # 项目配置
├── Dockerfile             # Docker 配置
└── README.md              # 文档
```

## API 速查

### 设备管理
```bash
# 获取所有设备
curl http://localhost:3000/api/devices

# 创建设备
curl -X POST http://localhost:3000/api/devices \
  -H "Content-Type: application/json" \
  -d '{"name":"Device","protocol":"TCP"}'

# 获取统计
curl http://localhost:3000/api/devices/stats

# 健康检查
curl http://localhost:3000/api/health
```

## 环境变量

```env
PORT=3000                    # 监听端口
NODE_ENV=development         # 运行环境
ENABLE_DEBUG=true            # 调试模式
DEVICE_TIMEOUT=5000          # 设备超时
MAX_CONNECTIONS=100          # 最大连接数
```

## 日志位置

日志文件存储在 `logs/` 目录：
- `INFO-*.log` - 信息日志
- `ERROR-*.log` - 错误日志
- `WARN-*.log` - 警告日志

## 常见问题速查

| 问题 | 解决方案 |
|------|---------|
| 端口被占用 | 修改 `.env` 中的 PORT |
| 模块未找到 | 运行 `npm install` |
| 代码规范错误 | 运行 `npm run lint:fix` |
| 测试失败 | 查看测试输出或日志 |
| Docker 启动失败 | 检查 Docker 服务 |

## 开发流程

1. 创建分支: `git checkout -b feature/xxx`
2. 开发代码: `npm run dev`
3. 运行测试: `npm test`
4. 检查规范: `npm run lint:fix`
5. 提交代码: `git commit -m "feat: xxx"`
6. 推送分支: `git push origin feature/xxx`
7. 提交 PR

## 关键文件速查

| 文件 | 说明 |
|------|------|
| `index.js` | 应用入口点 |
| `package.json` | 项目配置和依赖 |
| `.env.example` | 环境变量示例 |
| `src/routes/devices.js` | 设备路由 |
| `src/controllers/deviceController.js` | 设备控制器 |
| `src/models/Device.js` | 设备模型 |
| `jest.config.js` | 测试配置 |
| `Dockerfile` | Docker 配置 |

## 扩展阅读

- [完整 README](./README.md)
- [API 文档](./API.md)
- [启动指南](./SETUP.md)
- [配置说明](./CONFIG.md)
- [贡献指南](./CONTRIBUTING.md)
- [项目概览](./PROJECT.md)
