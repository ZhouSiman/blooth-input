require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./src/utils/logger');
const devicesRouter = require('./src/routes/devices');
const { errorHandler } = require('./src/middleware/errorHandler');
const { requestLogger } = require('./src/middleware/requestLogger');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware
app.use(requestLogger);

// Request logging middleware
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.path}`, req.body || {});
  next();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.html'));
});

// API Routes
app.use('/api/devices', devicesRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime(),
    memory: {
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
    },
  });
});

// API 文档信息
app.get('/api', (req, res) => {
  res.json({
    success: true,
    name: 'Device Sentinel PRO',
    version: '1.0.0',
    description: '智能多协议分流系统',
    endpoints: {
      devices: '/api/devices',
      health: '/api/health',
      docs: '请查看 API.md',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    path: req.path,
    hint: '查看 /api 了解可用的端点',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Device Sentinel PRO 运行在 http://localhost:${PORT}`);
  logger.info(`环境: ${NODE_ENV}`);
  logger.info('API 文档: http://localhost:3000/api');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM 信号已收到，开始关闭服务器');
  server.close(() => {
    logger.info('服务器已关闭');
    process.exit(0);
  });
});

// 未捕获的异常处理
process.on('uncaughtException', (error) => {
  logger.error('未捕获的异常', error);
  process.exit(1);
});

// 未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的 Promise 拒绝', { promise, reason });
});
