# Contributing to Device Sentinel PRO

感谢你对 Device Sentinel PRO 的兴趣！以下是贡献指南。

## 行为准则

本项目采用 Contributor Covenant 行为准则。参与者同意遵守该准则。请向项目维护者报告不可接受的行为。

## 开发流程

### 1. Fork 项目
点击 GitHub 上的 "Fork" 按钮创建项目副本。

### 2. 克隆本地仓库
```bash
git clone https://github.com/your-username/blooth-input.git
cd blooth-input
```

### 3. 创建特性分支
```bash
git checkout -b feature/你的特性名
# 或
git checkout -b fix/修复说明
# 或
git checkout -b docs/文档更新
```

分支命名约定：
- `feature/` - 新功能
- `fix/` - 修复 Bug
- `docs/` - 文档更新
- `refactor/` - 代码重构
- `test/` - 测试相关

### 4. 进行开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 检查代码规范
npm run lint

# 格式化代码
npm run format
```

### 5. 提交更改
```bash
git add .
git commit -m "type: 提交说明"
```

Commit 类型约定：
- `feat:` - 新功能
- `fix:` - 修复 Bug
- `docs:` - 文档更新
- `style:` - 代码风格
- `refactor:` - 代码重构
- `test:` - 测试相关

### 6. 推送到远程仓库
```bash
git push origin feature/你的特性名
```

### 7. 创建 Pull Request
1. 进入 GitHub 项目页面
2. 点击 "New Pull Request"
3. 选择你的分支
4. 填写 PR 说明
5. 提交 PR

## 代码规范

- 使用 2 个空格缩进
- 遵循 ESLint 规则
- 使用单引号
- 末尾添加分号
- 添加适当的注释
- 编写清晰的 commit 消息

### 提交前检查
```bash
npm run lint:fix
npm run format
npm test
```

## 测试要求

所有新功能和 Bug 修复都必须包含测试。

```bash
npm test
npm run test:coverage
```

## 报告问题

请在 Issues 中详细描述问题，包括：

- 问题描述
- 复现步骤
- 预期行为
- 实际行为
- 环境信息

## 许可证

提交代码表示你同意在 MIT 许可证下发布你的贡献。
