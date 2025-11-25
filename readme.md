# 我的小程序

一个基础的微信小程序项目模板。

## 项目结构

```
my-miniapp/
├── pages/                # 页面目录
│   ├── home/            # 首页（Tab 1）
│   │   ├── home.js
│   │   ├── home.json
│   │   ├── home.wxml
│   │   └── home.wxss
│   ├── discover/        # 发现页（Tab 2）
│   │   ├── discover.js
│   │   ├── discover.json
│   │   ├── discover.wxml
│   │   └── discover.wxss
│   ├── profile/         # 个人中心（Tab 3）
│   │   ├── profile.js
│   │   ├── profile.json
│   │   ├── profile.wxml
│   │   └── profile.wxss
│   └── logs/            # 日志页
│       ├── logs.js
│       ├── logs.json
│       ├── logs.wxml
│       └── logs.wxss
├── images/              # 图片资源目录
│   └── README.md       # 图标说明文档
├── utils/               # 工具函数目录
│   └── util.js         # 通用工具函数
├── app.js              # 小程序逻辑
├── app.json            # 小程序公共配置（含 TabBar）
├── app.wxss            # 小程序公共样式表
├── sitemap.json        # 站点地图配置
├── project.config.json # 项目配置文件
└── README.md           # 项目说明文档
```

## 功能特性

- 📱 底部 TabBar 导航（3个标签页）
- 🏠 首页（占位页面，待开发）
- 🔍 发现页（占位页面，待开发）
- 👤 个人中心（完整功能）
  - 用户信息展示
  - 获取用户授权
  - 功能菜单列表
  - 启动日志入口
- 📝 启动日志记录
- 🎨 现代化渐变 UI 设计
- 💾 本地缓存用户信息

## 快速开始

### 1. 安装微信开发者工具

从[微信公众平台](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)下载并安装微信开发者工具。

### 2. 导入项目

1. 打开微信开发者工具
2. 点击"导入项目"
3. 选择本项目目录
4. 输入 AppID（或使用测试号）

### 3. 开始开发

项目导入成功后，即可开始开发调试。

## 页面说明

### 首页 (pages/home) - Tab 1

- 占位页面，待开发具体功能
- 当前显示简单的首页提示

### 发现页 (pages/discover) - Tab 2

- 占位页面，待开发具体功能
- 当前显示简单的发现页提示

### 个人中心 (pages/profile) - Tab 3

- 用户信息展示区域（头像、昵称）
- 登录授权功能
- 功能菜单：
  - 📝 启动日志
  - 📦 我的订单（待开发）
  - ⭐ 我的收藏（待开发）
  - ⚙️ 设置（待开发）
  - ℹ️ 关于（待开发）
- 版本信息显示
- 渐变色背景设计

### 日志页 (pages/logs)

- 展示小程序的启动日志
- 记录每次启动的时间
- 可从个人中心进入

## 配置说明

### app.json

全局配置文件，包含：
- 页面路径配置
- 窗口样式配置
- 导航栏样式
- **TabBar 配置**（底部导航栏）

### project.config.json

项目配置文件，包含：
- 编译配置
- 项目设置
- AppID 等信息

## 开发建议

1. **页面开发**：每个页面由 4 个文件组成（.js、.json、.wxml、.wxss）
2. **样式单位**：建议使用 rpx 作为样式单位，可自动适配不同屏幕
3. **数据绑定**：使用 `{{}}` 进行数据绑定
4. **事件绑定**：使用 `bind` 或 `catch` 前缀绑定事件

## 相关文档

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [微信小程序API文档](https://developers.weixin.qq.com/miniprogram/dev/api/)
- [微信小程序组件文档](https://developers.weixin.qq.com/miniprogram/dev/component/)

## TabBar 图标

当前 TabBar 配置为纯文字模式。如需添加图标：

1. 在 `images` 目录下准备图标文件（详见 `images/README.md`）
2. 在 `app.json` 的 tabBar 配置中添加 `iconPath` 和 `selectedIconPath`

图标要求：
- 格式：PNG（支持透明）
- 尺寸：81px * 81px 或 162px * 162px
- 大小：每个图标 < 40KB

## 注意事项

1. 本项目使用的是测试 AppID（touristappid），正式发布前需要在 `project.config.json` 中替换为真实的 AppID
2. 使用 `wx.getUserProfile` 获取用户信息需要用户授权（需在真机上测试）
3. TabBar 至少需要 2 个、最多 5 个 tab
4. 首页和发现页为占位页面，可根据实际需求开发具体功能
5. 个人中心的部分菜单功能待开发，点击会提示"功能开发中"

## License

MIT

