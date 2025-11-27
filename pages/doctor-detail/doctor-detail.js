Page({
  data: {
    doctor: null,
    videos: [],
    statusBarHeight: 0,
    navBarHeight: 0,
    page: 1,
    pageSize: 6,
    loading: false,
    hasMore: true
  },

  onLoad(options) {
    this.setNavBarHeight();
    
    if (options.doctor) {
      try {
        const doctor = JSON.parse(decodeURIComponent(options.doctor));
        this.setData({ doctor });
        this.loadDoctorVideos();
      } catch (e) {
        console.error('解析医生数据失败', e);
        wx.showToast({
          title: '数据加载失败',
          icon: 'none'
        });
      }
    }
  },

  // 设置导航栏高度
  setNavBarHeight() {
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight || 0;
    const navBarHeight = statusBarHeight + 44;
    
    this.setData({
      statusBarHeight,
      navBarHeight
    });
  },

  // 加载医生的视频作品
  loadDoctorVideos() {
    if (this.data.loading || !this.data.hasMore) {
      return;
    }

    this.setData({ loading: true });

    // 模拟异步请求
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
    
    // 模拟最多加载28个视频
    const totalVideos = 28;
    const count = Math.min(pageSize, totalVideos - startIndex);
    
    const titles = [
      '谁在支付\n健康高利贷？',
      '80%普及率\n93%筛查率',
      '心血管疾病\n预防指南',
      '高血压患者\n饮食建议',
      '糖尿病防治\n科普讲座',
      '冠心病预防\n注意事项'
    ];
    
    // 视频URL列表
    const videoUrls = [
      'http://localhost:8080/one.mp4',
      'http://localhost:8080/two.mp4',
      'http://localhost:8080/three.mp4'
    ];
    
    for (let i = 0; i < count; i++) {
      const index = startIndex + i + 1;
      const videoIndex = (index - 1) % videoUrls.length;
      videos.push({
        id: index,
        cover: `https://picsum.photos/400/500?random=${200 + index}`,
        videoUrl: videoUrls[videoIndex],
        title: titles[(index - 1) % titles.length],
        name: `视频内容${index}标题`,
        author: this.data.doctor ? this.data.doctor.name : '医生',
        avatar: this.data.doctor ? this.data.doctor.avatar : '',
        description: `${this.data.doctor ? this.data.doctor.name : '医生'}的健康科普视频`,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 500),
        liked: false,
        isTop: index === 1
      });
    }
    
    return videos;
  },

  // 滚动到底部加载更多
  loadMore() {
    this.loadDoctorVideos();
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      fail: () => {
        wx.switchTab({
          url: '/pages/home/home'
        });
      }
    });
  },

  // 关注医生
  onFollow() {
    wx.showToast({
      title: '关注成功',
      icon: 'success'
    });
  },

  // 点击视频
  onVideoTap(e) {
    const index = e.currentTarget.dataset.index;
    
    if (index === undefined || index < 0 || index >= this.data.videos.length) {
      wx.showToast({
        title: '视频不存在',
        icon: 'none'
      });
      return;
    }
    
    // 跳转到视频播放页面
    wx.navigateTo({
      url: `/pages/video-player/video-player?index=${index}&videos=${encodeURIComponent(JSON.stringify(this.data.videos))}`
    });
  },

  // 页面上拉触底事件
  onReachBottom() {
    this.loadMore();
  },

  onShareAppMessage() {
    const doctor = this.data.doctor;
    return {
      title: doctor ? `推荐医生：${doctor.name} - ${doctor.title}` : '医生详情',
      path: `/pages/doctor-detail/doctor-detail?doctor=${encodeURIComponent(JSON.stringify(doctor))}`
    };
  }
});
