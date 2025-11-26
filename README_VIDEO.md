# 🎬 视频服务器使用说明

## ✅ 服务器已启动

**状态：** 🟢 运行中  
**端口：** 8080  
**进程：** Node.js (PID: 51751)

### 视频访问地址
- `http://localhost:8080/one.mp4` ✅
- `http://localhost:8080/two.mp4` ✅
- `http://localhost:8080/three.mp4` ✅

---

## 🔧 必要配置（重要！）

### 微信开发者工具设置

1. 点击右上角 **"详情"**
2. 选择 **"本地设置"** 标签
3. ✅ **必须勾选**：
   ```
   ☑️ 不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书
   ```

**如果不勾选这个选项，视频无法加载！**

---

## 🎯 测试步骤

1. ✅ 确认服务器运行中（上面显示的 PID）
2. ✅ 配置微信开发者工具（勾选不校验域名）
3. ✅ **重新编译**小程序
4. ✅ 点击首页的视频卡片
5. ✅ 视频应该可以正常播放

---

## 🖥️ 服务器管理

### 查看服务器状态
```bash
lsof -i :8080
```

### 停止服务器
```bash
# 查找进程
lsof -i :8080

# 停止服务器（替换 PID）
kill PID
```

### 启动服务器
```bash
cd /Users/lijiahang/workspace/yabing100

# 方式1：使用启动脚本（推荐）
./start-video-server.sh

# 方式2：直接运行 Node.js
node video-server.js

# 方式3：直接运行 Python
python3 video-server.py
```

---

## ✨ 服务器特性

### Node.js 版本（当前使用） ⭐
- ✅ 完整的 CORS 支持
- ✅ HTTP Range 请求（支持视频拖动）
- ✅ 视频流式传输
- ✅ 更好的性能
- ✅ 详细的日志输出

### Python 版本（备用）
- ✅ 基本的 CORS 支持
- ✅ HTTP Range 请求
- ✅ 无需额外依赖

---

## 📹 视频映射关系

```
视频 1  → one.mp4
视频 2  → two.mp4
视频 3  → three.mp4
视频 4  → one.mp4  (循环)
视频 5  → two.mp4  (循环)
视频 6  → three.mp4 (循环)
...以此类推
```

---

## ❓ 常见问题

### Q: 视频一直转圈加载不出来？
**A:** 检查清单：
1. 服务器是否运行？运行 `lsof -i :8080` 检查
2. 是否勾选了"不校验合法域名"？
3. 是否重新编译了小程序？
4. 查看控制台是否有错误信息

### Q: 显示 ERR_FAILED？
**A:** 
1. 重启服务器：`kill PID` 然后重新运行 `./start-video-server.sh`
2. 清除微信开发者工具缓存：「工具」>「清除缓存」
3. 重新编译小程序

### Q: 真机预览无法播放？
**A:** 真机预览需要使用 HTTPS 的网络地址，不能使用 localhost。
需要将视频上传到云存储（如腾讯云 COS）。

### Q: 视频文件在哪里？
**A:** 视频文件在项目根目录：
- `/Users/lijiahang/workspace/yabing100/one.mp4`
- `/Users/lijiahang/workspace/yabing100/two.mp4`
- `/Users/lijiahang/workspace/yabing100/three.mp4`

---

## 🚀 生产环境部署

开发完成后，需要将视频上传到服务器：

### 推荐方案：腾讯云 COS
1. 创建 COS 存储桶
2. 上传视频文件
3. 获取 URL：`https://your-bucket.cos.ap-xxx.myqcloud.com/one.mp4`
4. 修改代码中的 `videoUrl`

### 替代方案
- 阿里云 OSS
- 七牛云存储
- 自建 Nginx 服务器

---

## 📝 当前配置确认

- [x] 服务器：Node.js ✅
- [x] 端口：8080 ✅
- [x] CORS：已启用 ✅
- [x] 范围请求：已启用 ✅
- [x] 视频文件：3 个 ✅

**现在可以在微信开发者工具中测试视频播放了！** 🎉

