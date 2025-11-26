#!/usr/bin/env node

/**
 * 本地视频服务器 - Node.js 版本
 * 支持 CORS、范围请求和视频流
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;
const HOST = '127.0.0.1';
const ROOT_DIR = __dirname;

// MIME 类型映射
const MIME_TYPES = {
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json'
};

// 获取文件 MIME 类型
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

// 处理请求
const server = http.createServer((req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  
  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 解析 URL
  const parsedUrl = url.parse(req.url);
  let filePath = path.join(ROOT_DIR, parsedUrl.pathname);
  
  // 防止目录遍历攻击
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    console.log(`❌ 文件不存在: ${parsedUrl.pathname}`);
    res.writeHead(404);
    res.end('File not found');
    return;
  }

  // 获取文件信息
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const mimeType = getMimeType(filePath);

  // 处理范围请求（视频拖动）
  const range = req.headers.range;
  
  if (range) {
    // 解析范围
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = (end - start) + 1;

    console.log(`📹 视频流请求: ${parsedUrl.pathname} (${start}-${end}/${fileSize})`);

    // 创建读取流
    const file = fs.createReadStream(filePath, { start, end });

    // 发送部分内容响应
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mimeType,
      'Cache-Control': 'no-cache'
    });

    file.pipe(res);
  } else {
    // 完整文件请求
    console.log(`📄 文件请求: ${parsedUrl.pathname}`);

    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': mimeType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });

    fs.createReadStream(filePath).pipe(res);
  }
});

// 启动服务器
server.listen(PORT, HOST, () => {
  console.log('='.repeat(60));
  console.log('🎬 视频服务器启动成功！');
  console.log('='.repeat(60));
  console.log(`📂 目录: ${ROOT_DIR}`);
  console.log(`🔗 地址: http://${HOST}:${PORT}`);
  console.log('');
  console.log('📹 视频文件访问地址：');
  console.log(`   • http://${HOST}:${PORT}/one.mp4`);
  console.log(`   • http://${HOST}:${PORT}/two.mp4`);
  console.log(`   • http://${HOST}:${PORT}/three.mp4`);
  console.log('');
  console.log('✅ CORS: 已启用');
  console.log('✅ 范围请求: 已启用（支持视频拖动）');
  console.log('✅ 视频流: 已启用');
  console.log('');
  console.log('⚠️  请确保在微信开发者工具中：');
  console.log('   「详情」>「本地设置」> 勾选「不校验合法域名」');
  console.log('');
  console.log('🛑 按 Ctrl+C 停止服务器');
  console.log('='.repeat(60));
  console.log('');
});

// 错误处理
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ 端口 ${PORT} 已被占用`);
    console.error('请先停止占用该端口的进程');
    process.exit(1);
  } else {
    console.error('❌ 服务器错误:', err);
  }
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n');
  console.log('🛑 服务器已停止');
  process.exit(0);
});

