#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
本地视频服务器 - 支持 CORS 和范围请求
用于微信小程序开发环境播放本地视频
"""

import http.server
import socketserver
import os
from urllib.parse import unquote

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    """支持 CORS 的 HTTP 请求处理器"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        """添加 CORS 头部"""
        # 允许跨域访问
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        # 支持范围请求（视频拖动）
        self.send_header('Accept-Ranges', 'bytes')
        # 缓存控制
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def do_OPTIONS(self):
        """处理 OPTIONS 预检请求"""
        self.send_response(200)
        self.end_headers()
    
    def log_message(self, format, *args):
        """自定义日志格式"""
        path = unquote(args[0]) if args else ''
        if '.mp4' in path or '.mov' in path:
            print(f"📹 视频请求: {path}")
        else:
            print(f"📄 请求: {args[0] if args else ''}")

def run_server():
    """启动服务器"""
    try:
        with socketserver.TCPServer(("127.0.0.1", PORT), CORSRequestHandler) as httpd:
            print("=" * 60)
            print("🎬 视频服务器启动成功！")
            print("=" * 60)
            print(f"📂 目录: {DIRECTORY}")
            print(f"🔗 地址: http://localhost:{PORT}")
            print("")
            print("📹 视频文件访问地址：")
            print(f"   • http://localhost:{PORT}/one.mp4")
            print(f"   • http://localhost:{PORT}/two.mp4")
            print(f"   • http://localhost:{PORT}/three.mp4")
            print("")
            print("✅ CORS: 已启用")
            print("✅ 范围请求: 已启用（支持视频拖动）")
            print("")
            print("⚠️  请确保在微信开发者工具中：")
            print("   「详情」>「本地设置」> 勾选「不校验合法域名」")
            print("")
            print("🛑 按 Ctrl+C 停止服务器")
            print("=" * 60)
            print("")
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n")
        print("🛑 服务器已停止")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ 端口 {PORT} 已被占用")
            print(f"请先停止占用该端口的进程，或修改端口号")
        else:
            raise

if __name__ == "__main__":
    run_server()

