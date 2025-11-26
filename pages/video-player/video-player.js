// pages/video-player/video-player.js
Page({
  data: {
    videoList: [],
    currentIndex: 0,
    initialIndex: 0,
    allVideos: [], // 所有视频数据
    page: 1,
    pageSize: 10,
    loading: false,
    hasMore: true,
    showTip: false,
    tipText: '',
    videoContext: null,
    videoLoading: false,
    videoError: false,
    videoErrorMsg: ''
  },

  onLoad(options) {
    // 获取传入的视频索引和所有视频数据
    const index = parseInt(options.index || 0);
    const videosJson = options.videos || '[]';
    
    try {
      const allVideos = JSON.parse(decodeURIComponent(videosJson));
      
      this.setData({
        allVideos: allVideos,
        videoList: allVideos,
        currentIndex: index,
        initialIndex: index
      });
      
      // 如果接近列表底部，预加载更多
      if (index >= allVideos.length - 3) {
        this.loadMore();
      }
    } catch (e) {
      console.error('解析视频数据失败:', e);
      wx.showToast({
        title: '视频加载失败',
        icon: 'none'
      });
    }
  },

  onReady() {
    // 创建视频上下文
    this.videoContext = wx.createVideoContext(`video-${this.data.currentIndex}`, this);
  },

  // Swiper 切换事件
  onSwiperChange(e) {
    const newIndex = e.detail.current;
    const oldIndex = this.data.currentIndex;
    
    // 暂停之前的视频
    if (oldIndex !== newIndex) {
      const oldVideoContext = wx.createVideoContext(`video-${oldIndex}`, this);
      oldVideoContext.pause();
    }
    
    this.setData({
      currentIndex: newIndex
    });
    
    // 切换到边界时显示提示
    if (newIndex === 0) {
      this.showBoundaryTip('已经是第一个视频了');
    } else if (newIndex === this.data.videoList.length - 1 && !this.data.hasMore) {
      this.showBoundaryTip('没有更多视频了');
    }
    
    // 接近底部时加载更多
    if (newIndex >= this.data.videoList.length - 3 && this.data.hasMore) {
      this.loadMore();
    }
    
    // 更新视频上下文
    this.videoContext = wx.createVideoContext(`video-${newIndex}`, this);
  },

  // 视频播放完毕自动播放下一个
  onVideoEnded(e) {
    const index = e.currentTarget.dataset.index;
    
    // 如果是当前播放的视频
    if (index === this.data.currentIndex) {
      // 检查是否还有下一个视频
      if (this.data.currentIndex < this.data.videoList.length - 1) {
        // 切换到下一个视频
        this.setData({
          currentIndex: this.data.currentIndex + 1
        });
      } else if (this.data.hasMore) {
        // 如果是最后一个但还有更多，先加载更多
        this.loadMore().then(() => {
          this.setData({
            currentIndex: this.data.currentIndex + 1
          });
        });
      } else {
        // 已经是最后一个视频
        this.showBoundaryTip('没有更多视频了');
      }
    }
  },

  // 视频开始播放
  onVideoPlay(e) {
    const index = e.currentTarget.dataset.index;
    console.log('视频开始播放:', index);
    this.setData({
      videoLoading: false,
      videoError: false
    });
  },

  // 视频暂停
  onVideoPause(e) {
    const index = e.currentTarget.dataset.index;
    console.log('视频暂停:', index);
  },

  // 视频加载中
  onVideoWaiting(e) {
    const index = e.currentTarget.dataset.index;
    console.log('视频缓冲中:', index);
    if (index === this.data.currentIndex) {
      this.setData({
        videoLoading: true
      });
    }
  },

  // 视频加载完成
  onVideoLoaded(e) {
    const index = e.currentTarget.dataset.index;
    console.log('视频加载完成:', index);
    if (index === this.data.currentIndex) {
      this.setData({
        videoLoading: false,
        videoError: false
      });
    }
  },

  // 视频错误
  onVideoError(e) {
    const index = e.currentTarget.dataset.index;
    const error = e.detail;
    console.error('视频加载错误:', index, error);
    
    if (index === this.data.currentIndex) {
      this.setData({
        videoLoading: false,
        videoError: true,
        videoErrorMsg: `错误代码: ${error.errMsg || '未知错误'}`
      });
      
      wx.showToast({
        title: '视频加载失败',
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 加载更多视频
  loadMore() {
    return new Promise((resolve, reject) => {
      if (this.data.loading || !this.data.hasMore) {
        resolve();
        return;
      }

      this.setData({ loading: true });

      // 模拟API请求
      setTimeout(() => {
        const newVideos = this.generateMockVideos(this.data.page, this.data.pageSize);
        
        this.setData({
          videoList: [...this.data.videoList, ...newVideos],
          page: this.data.page + 1,
          loading: false,
          hasMore: newVideos.length === this.data.pageSize && this.data.page < 5 // 模拟最多5页
        });
        
        resolve();
      }, 500);
    });
  },

  // 生成模拟视频数据
  generateMockVideos(page, pageSize) {
    const videos = [];
    const startIndex = this.data.videoList.length;
    
    // 视频文件列表
    const localVideos = [
      {
        videoUrl: 'http://localhost:8080/one.mp4',
        title: '精彩视频 1 - 本地视频演示',
        author: 'UP主1',
        description: '这是第一个本地视频'
      },
      {
        videoUrl: 'http://localhost:8080/two.mp4',
        title: '精彩视频 2 - 本地视频演示',
        author: 'UP主2',
        description: '这是第二个本地视频'
      },
      {
        videoUrl: 'http://localhost:8080/three.mp4',
        title: '精彩视频 3 - 本地视频演示',
        author: 'UP主3',
        description: '这是第三个本地视频'
      }
    ];
    
    for (let i = 0; i < pageSize; i++) {
      const index = startIndex + i + 1;
      // 循环使用本地视频：1->one, 2->two, 3->three, 4->one...
      const videoIndex = (index - 1) % localVideos.length;
      const localVideo = localVideos[videoIndex];
      
      // 获取文件名用于显示
      const fileName = localVideo.videoUrl.split('/').pop().replace('.mp4', '');
      
      videos.push({
        id: index,
        videoUrl: localVideo.videoUrl,
        cover: `https://picsum.photos/750/1334?random=${index}`,
        title: `视频 ${index} - ${fileName}.mp4`,
        author: `UP主${index}`,
        description: `这是 ${fileName}.mp4 视频（编号${index}）`,
        likes: Math.floor(Math.random() * 10000),
        comments: Math.floor(Math.random() * 1000),
        liked: false,
        views: Math.floor(Math.random() * 100000)
      });
      
      console.log(`视频 ${index} 对应文件: ${fileName}.mp4`);
    }
    
    return videos;
  },

  // 显示边界提示
  showBoundaryTip(text) {
    this.setData({
      showTip: true,
      tipText: text
    });
    
    setTimeout(() => {
      this.setData({
        showTip: false
      });
    }, 1500);
  },

  // 点赞
  onLikeTap(e) {
    const index = e.currentTarget.dataset.index;
    const videoList = this.data.videoList;
    const video = videoList[index];
    
    video.liked = !video.liked;
    video.likes += video.liked ? 1 : -1;
    
    this.setData({
      [`videoList[${index}]`]: video
    });
  },

  // 评论
  onCommentTap(e) {
    wx.showToast({
      title: '评论功能开发中',
      icon: 'none'
    });
  },

  // 分享
  onShareTap(e) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 返回按钮
  onBackTap() {
    wx.navigateBack({
      delta: 1
    });
  },

  onUnload() {
    // 页面卸载时暂停视频
    if (this.videoContext) {
      this.videoContext.pause();
    }
  },

  onHide() {
    // 页面隐藏时暂停视频
    if (this.videoContext) {
      this.videoContext.pause();
    }
  },

  onShow() {
    // 页面显示时继续播放
    if (this.videoContext && this.data.currentIndex >= 0) {
      // 可选：是否自动播放
      // this.videoContext.play();
    }
  },

  onShareAppMessage() {
    const currentVideo = this.data.videoList[this.data.currentIndex];
    return {
      title: currentVideo ? currentVideo.title : '分享精彩视频',
      path: `/pages/video-player/video-player?index=${this.data.currentIndex}`
    };
  }
})

