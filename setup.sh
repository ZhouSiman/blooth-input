#!/bin/bash

# Device Sentinel PRO 快速启动脚本

echo "======================================"
echo "🚀 Device Sentinel PRO 启动脚本"
echo "======================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未找到 Node.js，请先安装 Node.js"
    echo "   访问 https://nodejs.org/ 下载安装"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"
echo ""

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖中..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装成功"
else
    echo "✅ 依赖已安装"
fi

echo ""

# 检查 .env
if [ ! -f ".env" ]; then
    echo "⚙️  创建 .env 文件..."
    cp .env.example .env
    echo "✅ .env 文件已创建，请根据需要修改配置"
fi

echo ""
echo "======================================"
echo "📖 可用命令："
echo "======================================"
echo "npm start        - 启动服务器（生产模式）"
echo "npm run dev      - 启动服务器（开发模式，热重载）"
echo "npm test         - 运行测试"
echo "npm run lint     - 检查代码规范"
echo "npm run format   - 格式化代码"
echo ""
echo "🌐 Web 访问: http://localhost:3000"
echo "📚 API 文档: 查看 API.md"
echo "======================================"
echo ""

read -p "现在启动服务器吗？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "启动中..."
    npm run dev
else
    echo "你可以手动运行: npm run dev"
fi
