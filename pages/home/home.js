// pages/home/home.js
Page({
  data: {
    banners: [],
    navItems: [],
    categories: [],
    activeCategory: 0,
    videos: [],
    page: 1,
    pageSize: 10,
    loading: false,
    hasMore: true
  },

  onLoad(options) {
    this.initData();
    this.loadVideos();
  },

  // 初始化Banner和金刚位数据
  initData() {
    // Banner数据
    const banners = [
      { id: 1, image: '/images/banner.png' }
    ];

    // 金刚位数据
    const navItems = [
      { id: 1, icon: '/images/kingkongone.png', name: '科普名医' },
      { id: 2, icon: '/images/kingkongtwo.png', name: '科普之星' },
      { id: 3, icon: '/images/kingkongthree.png', name: 'CHTV' }
    ];

    // 分类标签数据
    const categories = [
      { id: 0, name: '推荐' },
      { id: 1, name: '健康科普' },
      { id: 2, name: '名医讲堂' },
      { id: 3, name: '养生保健' },
      { id: 4, name: '疾病预防' }
    ];

    this.setData({
      banners,
      navItems,
      categories
    });
  },

  // 加载视频列表
  loadVideos() {
    if (this.data.loading || !this.data.hasMore) {
      return;
    }

    this.setData({ loading: true });

    // 模拟API请求（这里使用setTimeout模拟异步请求）
    setTimeout(() => {
      const newVideos = this.generateMockVideos(this.data.page, this.data.pageSize);
      
      this.setData({
        videos: [...this.data.videos, ...newVideos],
        page: this.data.page + 1,
        loading: false,
        hasMore: newVideos.length === this.data.pageSize
      });
    }, 500);
  },

  // 生成模拟视频数据
  generateMockVideos(page, pageSize) {
    const videos = [];
    const startIndex = (page - 1) * pageSize;
    
    // 视频文件列表
    // 注意：微信小程序需要使用网络URL或临时文件路径
    // 开发环境可以使用以下测试视频，生产环境需要替换为实际的服务器地址
    const localVideos = [
      {
        videoUrl: 'http://localhost:8080/one.mp4', // 本地开发服务器
        // videoUrl: 'https://your-server.com/one.mp4', // 生产环境使用
        cover: 'https://picsum.photos/350/200?random=1',
        title: '精彩视频 1 - 本地视频演示',
        author: 'UP主1',
        description: '这是第一个本地视频'
      },
      {
        videoUrl: 'http://localhost:8080/two.mp4',
        // videoUrl: 'https://your-server.com/two.mp4',
        cover: 'https://picsum.photos/350/200?random=2',
        title: '精彩视频 2 - 本地视频演示',
        author: 'UP主2',
        description: '这是第二个本地视频'
      },
      {
        videoUrl: 'http://localhost:8080/three.mp4',
        // videoUrl: 'https://your-server.com/three.mp4',
        cover: 'https://picsum.photos/350/200?random=3',
        title: '精彩视频 3 - 本地视频演示',
        author: 'UP主3',
        description: '这是第三个本地视频'
      }
    ];
    
    // 模拟最多加载50个视频
    const totalVideos = 50;
    const count = Math.min(pageSize, totalVideos - startIndex);
    
    for (let i = 0; i < count; i++) {
      const index = startIndex + i + 1;
      // 循环使用本地视频：1->one, 2->two, 3->three, 4->one...
      const videoIndex = (index - 1) % localVideos.length;
      const localVideo = localVideos[videoIndex];
      
      // 获取文件名用于显示
      const fileName = localVideo.videoUrl.split('/').pop().replace('.mp4', '');
      
      videos.push({
        id: index,
        videoUrl: localVideo.videoUrl,
        cover: `https://picsum.photos/350/380?random=${index}`,
        title: `健康科普知识第${index}期 - 专家讲解${fileName}相关医学知识`,
        author: `张医生${index}`,
        avatar: `https://picsum.photos/44/44?random=${index + 1000}`,
        description: `这是 ${fileName}.mp4 视频（编号${index}）`,
        views: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 5000),
        duration: `${Math.floor(Math.random() * 10)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
      });
      
      // 输出映射关系到控制台，方便调试
      console.log(`视频 ${index} 对应文件: ${fileName}.mp4`);
    }
    
    return videos;
  },

  // 滚动到底部加载更多
  loadMore() {
    this.loadVideos();
  },

  // 金刚位点击事件
  onNavTap(e) {
    const id = e.currentTarget.dataset.id;
    const nav = this.data.navItems.find(item => item.id === id);
    wx.showToast({
      title: `点击了${nav.name}`,
      icon: 'none'
    });
  },

  // 分类标签点击事件
  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      activeCategory: id,
      videos: [],
      page: 1,
      hasMore: true
    });
    this.loadVideos();
  },

  // 视频点击事件
  onVideoTap(e) {
    const id = e.currentTarget.dataset.id;
    
    // 找到点击的视频在列表中的索引
    const index = this.data.videos.findIndex(video => video.id === id);
    
    if (index === -1) {
      wx.showToast({
        title: '视频不存在',
        icon: 'none'
      });
      return;
    }
    
    // 准备视频数据（已经包含了videoUrl）
    const videosWithUrl = this.data.videos.map(video => ({
      ...video,
      description: video.description || `这是${video.title}的详细描述`,
      likes: video.views ? Math.floor(video.views / 10) : Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 500),
      liked: false
    }));
    
    // 跳转到视频播放页面
    wx.navigateTo({
      url: `/pages/video-player/video-player?index=${index}&videos=${encodeURIComponent(JSON.stringify(videosWithUrl))}`
    });
  },

  onReady() {
    
  },

  onShow() {
    
  },

  onHide() {
    
  },

  onUnload() {
    
  },

  onPullDownRefresh() {
    // 下拉刷新
    this.setData({
      videos: [],
      page: 1,
      hasMore: true
    });
    this.loadVideos();
    wx.stopPullDownRefresh();
  },

  onShareAppMessage() {
    return {
      title: '发现精彩视频',
      path: '/pages/home/home'
    }
  }
})

