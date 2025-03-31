# PowerAI Chat

一个基于 Vue 3 + TypeScript + Element Plus 开发的现代化 AI 聊天应用。

![应用预览](https://element-plus.org/images/element-plus-logo.svg)

## 功能特点

### 1. 智能对话
- 支持普通对话和深度思考模式
- 实时响应，流畅的用户体验
- 支持 Markdown 格式的富文本回复
- 支持代码高亮显示
- 支持数学公式（KaTeX）
- 支持图片和表格展示

### 2. 会话管理
- 创建新会话
- 重命名会话
- 删除会话
- 会话列表显示/隐藏
- 会话标题快速编辑

### 3. 输入增强
- 多行文本输入
- 快捷键支持（Enter 发送，Shift + Enter 换行）
- 文件上传功能
- 深度思考模式
- 联网搜索模式

### 4. 界面设计
- 现代简约的 UI 设计
- 响应式布局
- 平滑的动画过渡
- 自适应的滚动条
- 良好的暗色模式支持

## 技术栈

- Vue 3 - 渐进式 JavaScript 框架
- TypeScript - 类型安全的 JavaScript 超集
- Element Plus - 基于 Vue 3 的组件库
- Vite - 现代前端构建工具
- Markdown-it - Markdown 解析器
- KaTeX - 数学公式渲染
- Highlight.js - 代码语法高亮

## 项目结构

\`\`\`
src/
├── components/         # 组件目录
│   └── chat/          # 聊天相关组件
│       ├── ChatInput.vue          # 输入组件
│       ├── ChatMessage.vue        # 消息组件
│       ├── ChatMessageList.vue    # 消息列表
│       ├── ChatSideNav.vue        # 侧边导航
│       └── ChatConversationList.vue # 会话列表
├── composables/       # 组合式函数
│   ├── useChat.ts    # 聊天相关逻辑
│   └── useTitleEdit.ts # 标题编辑逻辑
├── types/            # TypeScript 类型定义
│   └── chat.ts      # 聊天相关类型
├── views/            # 页面视图
│   └── Chat.vue     # 主聊天页面
├── App.vue          # 根组件
├── main.ts          # 入口文件
└── style.css        # 全局样式
\`\`\`

## 开发指南

### 环境要求
- Node.js >= 16
- npm >= 7

### 安装依赖
\`\`\`bash
npm install
\`\`\`

### 开发服务器
\`\`\`bash
npm run dev
\`\`\`

### 构建生产版本
\`\`\`bash
npm run build
\`\`\`

## 使用说明

1. **创建新会话**
   - 点击左侧导航栏的 "+" 按钮创建新会话

2. **发送消息**
   - 在输入框中输入消息
   - 按 Enter 发送，Shift + Enter 换行
   - 可选择深度思考或联网搜索模式

3. **会话管理**
   - 点击会话列表中的更多按钮（...）
   - 可以重命名或删除会话
   - 点击会话标题可以快速编辑

4. **界面调整**
   - 点击左侧导航栏的对话图标可以显示/隐藏会话列表
   - 滚动条会在需要时自动显示

## 贡献指南

1. Fork 本仓库
2. 创建特性分支：\`git checkout -b feature/AmazingFeature\`
3. 提交改动：\`git commit -m 'Add some AmazingFeature'\`
4. 推送分支：\`git push origin feature/AmazingFeature\`
5. 提交 Pull Request

## 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解更多详情
