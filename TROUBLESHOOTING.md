# 故障排除指南

## 💻 安装和启动问题

### 问题 1: Node.js 版本不兼容
**症状:** `Error: You are using a version of Node.js that is not supported`

**原因:** 项目需要 Node.js >= 14.0

**解决方案:**
```bash
# 检查 Node.js 版本
node --version

# 升级 Node.js
# 访问 https://nodejs.org/ 下载最新版本
```

### 问题 2: npm 依赖安装失败
**症状:** `npm ERR! code ERESOLVE`

**原因:** 依赖版本冲突

**解决方案:**
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 和 lock 文件
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题 3: 模块未找到错误
**症状:** `Error: Cannot find module 'express'`

**原因:** 未安装依赖或路径错误

**解决方案:**
```bash
# 安装依赖
npm install

# 检查 package.json 中是否列出了需要的模块
```

### 问题 4: 端口已被占用
**症状:** `Error: listen EADDRINUSE: address already in use :::3000`

**原因:** 端口 3000 已被其他应用使用

**解决方案:**

**Windows:**
```powershell
# 查找占用 3000 端口的进程
netstat -ano | findstr :3000

# 杀死进程 (PID 为进程 ID)
taskkill /PID <PID> /F

# 或修改 .env 文件中的 PORT
```

**Mac/Linux:**
```bash
# 查找占用 3000 端口的进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或修改端口
```

---

## 🔧 运行和开发问题

### 问题 5: 服务器启动缓慢
**症状:** 应用启动需要很长时间

**原因:** 可能是磁盘 I/O 缓慢或模块加载缓慢

**解决方案:**
```bash
# 检查是否有进程占用磁盘
# 使用性能监视器查看磁盘使用情况

# 尝试删除 node_modules 重新安装
rm -rf node_modules
npm install
```

### 问题 6: 代码修改后服务不更新
**症状:** 修改代码后需要手动重启服务

**原因:** 未使用开发模式

**解决方案:**
```bash
# 使用开发模式（支持热重载）
npm run dev
```

### 问题 7: API 请求返回 404
**症状:** `GET /api/devices 返回 404`

**原因:** 路由未正确注册或路径错误

**解决方案:**
1. 检查 `index.js` 中是否正确注册了路由
2. 检查路由文件路径是否正确
3. 查看服务器日志找出错误

```javascript
// index.js 中应该包含
const devicesRouter = require('./src/routes/devices');
app.use('/api/devices', devicesRouter);
```

### 问题 8: CORS 错误
**症状:** `Access to XMLHttpRequest has been blocked by CORS policy`

**原因:** CORS 未正确配置

**解决方案:**
```javascript
// index.js 中应该包含
const cors = require('cors');
app.use(cors());
```

---

## 🧪 测试问题

### 问题 9: 测试执行缓慢
**症状:** `npm test` 需要很长时间才能完成

**原因:** 可能有大量测试或测试超时

**解决方案:**
```bash
# 运行单个测试文件
npm test -- tests/controllers/deviceController.test.js

# 使用 --verbose 获取详细输出
npm test -- --verbose
```

### 问题 10: 测试报告导入失败
**症状:** `Cannot find module 'supertest'`

**原因:** 开发依赖未安装

**解决方案:**
```bash
# 检查 package.json 中是否包含开发依赖
# 重新安装
npm install --save-dev supertest jest
```

---

## 📝 日志和调试问题

### 问题 11: 看不到调试日志
**症状:** 调试消息未显示在控制台

**原因:** 调试模式未启用

**解决方案:**
```bash
# 修改 .env 文件
ENABLE_DEBUG=true

# 重启服务
npm run dev
```

### 问题 12: 日志文件过大
**症状:** `logs/` 目录占用大量磁盘空间

**原因:** 日志文件长期积累

**解决方案:**
```bash
# 备份日志（可选）
cp logs/ logs_backup/

# 删除旧日志文件
rm logs/*.log

# 或定期清理脚本
# 在 logs 目录中设置旧文件自动删除
```

---

## 🐳 Docker 问题

### 问题 13: Docker 构建失败
**症状:** `docker build` 命令失败

**原因:** 可能是 Docker 服务未运行或 Dockerfile 有错误

**解决方案:**
```bash
# 确保 Docker 已安装并运行
docker --version

# 检查 Docker 服务
# Windows: 检查任务栏中的 Docker 图标
# Mac: 检查菜单栏中的 Docker 图标

# 重新构建（清除缓存）
docker build --no-cache -t blooth-input:latest .
```

### 问题 14: Docker 容器启动失败
**症状:** 容器启动后立即退出

**原因:** 应用内部错误

**解决方案:**
```bash
# 查看容器日志
docker logs <container-id>

# 交互模式运行容器以查看错误
docker run -it blooth-input:latest npm start
```

### 问题 15: Docker Compose 启动失败
**症状:** `docker-compose up` 失败

**原因:** 配置文件错误或依赖问题

**解决方案:**
```bash
# 检查配置文件语法
docker-compose config

# 查看详细输出
docker-compose up --verbose

# 清除之前的容器和网络
docker-compose down -v
docker-compose up -d
```

---

## 💾 数据和状态问题

### 问题 16: 数据在重启后丢失
**症状:** 创建的设备在重启后消失

**原因:** 当前使用内存存储，未持久化

**解决方案:**
这是预期行为。计划在后续版本中集成数据库。

临时解决方案：
```javascript
// 在 deviceController.js 中保存到文件
const fs = require('fs');
// 在创建/更新/删除时保存状态
```

### 问题 17: 内存占用不断增加
**症状:** 应用运行一段时间后内存占用不断增加

**原因:** 可能有内存泄漏

**解决方案:**
```bash
# 使用 node 内存分析工具
npm install --save-dev clinic

# 分析内存使用
clinic doctor -- node index.js

# 查看进程内存占用
node --max-old-space-size=2048 index.js
```

---

## 🔍 调试技巧

### 启用详细日志
```bash
# .env 文件
ENABLE_DEBUG=true
NODE_ENV=development
```

### 使用 Node.js 调试器
```bash
# 启用 inspect 模式
node --inspect index.js

# 在 Chrome 中访问 chrome://inspect
```

### 查看请求详情
```bash
# 在 index.js 中添加请求日志
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

---

## 📞 获取帮助

1. 查看 [README.md](./README.md)
2. 查看 [API.md](./API.md)
3. 检查 logs/ 目录中的日志文件
4. 在 GitHub Issues 中搜索
5. 提交新的 Issue 或 Pull Request

---

## 报告 Bug

提交 Bug 时请包含：
1. Node.js 版本: `node --version`
2. npm 版本: `npm --version`
3. 操作系统和版本
4. 完整的错误信息和堆栈跟踪
5. 复现步骤
6. 相关的日志文件

这样有助于我们快速定位和解决问题。
