# 项目配置文件

## 项目信息
- **项目名称:** Device Sentinel PRO
- **项目描述:** 智能多协议分流系统
- **版本:** 1.0.0
- **作者:** ZhouSiman
- **许可证:** MIT

## 文件说明

### 核心文件
- `index.js` - 应用程序主入口，配置 Express 服务器
- `package.json` - 项目依赖和脚本配置
- `main.html` - 前端应用页面

### 配置文件
- `.env.example` - 环境变量示例文件
- `.gitignore` - Git 忽略配置
- `.eslintrc.json` - ESLint 代码规范配置
- `.prettierrc.json` - Prettier 代码格式化配置
- `jest.config.js` - Jest 测试框架配置
- `Dockerfile` - Docker 镜像构建配置
- `docker-compose.yml` - Docker Compose 编排配置

### 文档文件
- `README.md` - 项目概览和使用指南
- `API.md` - API 文档
- `SETUP.md` - 项目启动指南
- `CONTRIBUTING.md` - 贡献指南

### 源代码结构
```
src/
├── controllers/
│   └── deviceController.js     # 设备控制器，包含所有业务逻辑
├── models/
│   └── Device.js               # 设备数据模型
├── routes/
│   └── devices.js              # 设备路由定义
└── utils/
    ├── logger.js               # 日志工具
    ├── constants.js            # 常量定义
    └── validators.js           # 验证工具
```

### 测试文件
```
tests/
├── controllers/
│   └── deviceController.test.js   # 控制器测试
└── models/
    └── Device.test.js             # 模型测试
```

## 环境变量配置

创建 `.env` 文件，配置以下变量：

```env
# 服务器配置
PORT=3000                    # 监听端口
NODE_ENV=development         # 运行环境 (development|production)

# 设备配置
DEVICE_TIMEOUT=5000          # 设备超时时间（毫秒）
MAX_CONNECTIONS=100          # 最大连接数

# 协议设置
PROTOCOL_VERSION=1.0         # 协议版本
ENABLE_DEBUG=false           # 是否启用调试模式
```

## npm 脚本说明

| 脚本 | 说明 |
|------|------|
| `npm start` | 启动应用（生产模式） |
| `npm run dev` | 启动应用（开发模式，支持热重载） |
| `npm test` | 运行所有测试 |
| `npm run test:watch` | 监视模式运行测试 |
| `npm run test:coverage` | 生成测试覆盖率报告 |
| `npm run lint` | 检查代码规范 |
| `npm run lint:fix` | 自动修复代码规范问题 |
| `npm run format` | 格式化代码 |
| `npm run build` | 构建项目 |

## 依赖说明

### 生产依赖
- **express** - Web 框架
- **cors** - 跨域资源共享中间件
- **dotenv** - 环境变量加载
- **uuid** - UUID 生成工具

### 开发依赖
- **nodemon** - 开发服务器自动重启
- **jest** - 单元测试框架
- **supertest** - HTTP 测试工具
- **eslint** - 代码规范检查
- **prettier** - 代码格式化工具

## 启动顺序

1. 安装 Node.js
2. 克隆项目
3. 执行 `npm install` 安装依赖
4. 复制 `.env.example` 到 `.env`
5. 修改 `.env` 配置（可选）
6. 执行 `npm run dev` 启动开发服务器

## 项目特性

✅ 完整的 REST API
✅ 实时设备监控
✅ 多协议支持
✅ 日志记录和存储
✅ 数据验证
✅ 错误处理
✅ 单元测试
✅ Docker 支持

## 注意事项

1. 确保 Node.js 版本 >= 14.0
2. 建议在开发时使用 `npm run dev` 以支持热重载
3. 生产环境应该使用 `npm start`
4. 记得配置 `.env` 文件
5. 所有日志存储在 `logs/` 目录
6. 提交代码前运行 `npm run lint:fix` 修复规范问题

## 故障排除

遇到问题时：
1. 检查 Node.js 版本
2. 清除 node_modules 和 package-lock.json，重新安装
3. 检查端口是否被占用
4. 查看日志文件获取错误信息
5. 参考 SETUP.md 中的常见问题部分
