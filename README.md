# BUCTCODER 前端项目

## 项目简介

BUCTCODER 是一个基于 Vue3 和 ElementPlus 开发的竞赛数据管理和展示系统，主要功能包括用户注册、数据爬取、数据展示和数据可视化。系统通过爬取 Codeforces 的比赛数据，并使用 Echarts 进行前端数据展示。

## 目录

- [项目简介](#项目简介)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [安装与运行](#安装与运行)
- [功能模块](#功能模块)
- [代码规范](#代码规范)
- [贡献指南](#贡献指南)
- [参考资源](#参考资源)

## 技术栈

- 前端框架：Vue3
- UI 库：ElementPlus
- 数据可视化：Echarts
- 状态管理：Pinia
- HTTP 请求：Axios

## 项目结构

```
src/
├── assets/               # 静态资源（图片、字体等）
├── components/           # 全局组件
├── views/                # 页面组件
├── api/                  # API 请求
├── store/                # Pinia 状态管理
├── router/               # Vue Router 配置
├── utils/                # 工具函数
├── styles/               # 全局样式
├── App.vue               # 根组件
├── main.js               # 入口文件
```

## 安装与运行

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run serve
```

### 构建生产版本

```bash
npm run build
```

### 代码格式检查

```bash
npm run lint
```

## 功能模块

### 用户注册与登录

- 用户可以注册新账号，并使用已注册账号登录。
- 使用 JWT + Redis 实现用户身份验证。

### 数据展示

- 使用爬虫技术获取 AtCoder 和 Codeforces 的比赛数据。
- 前端使用 Echarts 展示数据，包括比赛、题目和排名信息。

### 用户管理

- 管理员可以管理用户信息和权限，更新题目数据。
- 普通用户可以查看和修改个人信息，绑定 CF 账号。

### 智能推荐与竞赛提醒

- 系统提供智能训练和竞赛提醒功能，帮助用户更好地参与编程竞赛。

## 代码规范

### 文件结构

- 所有全局组件放置在 `components` 文件夹中。
- 页面组件放置在 `views` 文件夹中。
- API 请求相关代码放置在 `api` 文件夹中。

### 命名约定

- 组件命名采用 PascalCase（首字母大写驼峰命名）。
- 变量和方法命名采用 camelCase（驼峰命名）。
- 自定义事件使用 kebab-case 命名。

### 样式

- 使用 scoped 防止样式污染。
- 使用 BEM (Block Element Modifier) 命名规范。

### 事件命名

- 自定义事件使用 kebab-case 命名。

### 模块化代码

- 功能拆分为小的、独立的组件，避免大型组件。
- 使用 Pinia 管理全局状态。

## 贡献指南

1. Fork 本仓库。
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)。
3. 提交修改 (`git commit -m 'Add some AmazingFeature'`)。
4. 推送到分支 (`git push origin feature/AmazingFeature`)。
5. 创建一个新的 Pull Request。

## 参考资源

- [Vue.js 官方文档](https://vuejs.org/)
- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [ElementPlus 官方文档](https://element-plus.org/)
- [Echarts 官方文档](https://echarts.apache.org/)
- [Pinia 状态管理文档](https://pinia.vuejs.org/)
- [ChatGPT](https://openai.com/chatgpt)
- [GitHub Copilot](https://github.com/features/copilot)
