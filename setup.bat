@echo off
REM Device Sentinel PRO 快速启动脚本（Windows）

echo ======================================
echo. 
echo ^^ Device Sentinel PRO 启动脚本
echo.
echo ======================================
echo.

REM 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo. ❌ 未找到 Node.js，请先安装
    echo. 访问 https://nodejs.org/ 下载安装
    pause
    exit /b 1
)

echo. ✅ Node.js 版本:
node --version

echo. ✅ npm 版本:
npm --version
echo.

REM 检查依赖
if not exist "node_modules" (
    echo. 📦 安装依赖中...
    call npm install
    if errorlevel 1 (
        echo. ❌ 依赖安装失败
        pause
        exit /b 1
    )
    echo. ✅ 依赖安装成功
) else (
    echo. ✅ 依赖已安装
)

echo.

REM 检查 .env
if not exist ".env" (
    echo. ⚙️  创建 .env 文件...
    copy .env.example .env
    echo. ✅ .env 文件已创建，请根据需要修改配置
)

echo.
echo ======================================
echo. 📖 可用命令:
echo ======================================
echo. npm start        - 启动服务器（生产模式）
echo. npm run dev      - 启动服务器（开发模式，热重载）
echo. npm test         - 运行测试
echo. npm run lint     - 检查代码规范
echo. npm run format   - 格式化代码
echo.
echo. 🌐 Web 访问: http://localhost:3000
echo. 📚 API 文档: 查看 API.md
echo ======================================
echo.

set /p choice="现在启动服务器吗? (y/n): "
if /i "%choice%"=="y" (
    echo. 启动中...
    call npm run dev
) else (
    echo. 你可以手动运行: npm run dev
)

pause
