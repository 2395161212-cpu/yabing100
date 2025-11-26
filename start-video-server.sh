#!/bin/bash

# 启动本地视频服务器
# 用于在微信小程序开发环境中提供视频文件访问

DIR="/Users/lijiahang/workspace/yabing100"

cd "$DIR"

# 优先使用 Node.js 服务器（性能更好，支持视频流）
if command -v node &> /dev/null; then
    echo "🎬 使用 Node.js 启动视频服务器..."
    node video-server.js
else
    echo "⚠️  未找到 Node.js，使用 Python 服务器..."
    echo ""
    
    # 使用 Python 启动
    if command -v python3 &> /dev/null; then
        python3 video-server.py
    elif command -v python &> /dev/null; then
        python video-server.py
    else
        echo "❌ 未找到 Node.js 或 Python"
        echo "请安装 Node.js: brew install node"
        exit 1
    fi
fi

