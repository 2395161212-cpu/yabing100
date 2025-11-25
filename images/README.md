# TabBar 图标说明

## 需要准备的图标文件

请在此目录下放置以下图标文件（建议尺寸：81px * 81px）：

### 首页图标
- `home.png` - 首页未选中状态
- `home-active.png` - 首页选中状态

### 发现图标
- `discover.png` - 发现未选中状态
- `discover-active.png` - 发现选中状态

### 我的图标
- `profile.png` - 我的未选中状态
- `profile-active.png` - 我的选中状态

## 临时方案

如果暂时没有图标，可以：
1. 使用在线图标生成工具制作简单图标
2. 从 iconfont 等网站下载免费图标
3. 使用设计工具（如 Figma、Sketch）制作
4. 先注释掉 app.json 中 tabBar 的 iconPath 配置，只使用文字

## 图标要求

- 格式：PNG（支持透明背景）
- 尺寸：建议 81px * 81px（或 162px * 162px）
- 大小：每个图标不超过 40KB
- 颜色：未选中态建议灰色，选中态建议主题色

