Page({
  data: {
    statusBarHeight: 0,
    navBarHeight: 0,
    title: '',
    titleLength: 0,
    videoInfo: {
      tempFilePath: '',
      duration: 0,
      size: 0
    },
    categories: [
      { id: 1, name: '心血管' },
      { id: 2, name: '糖尿病' },
      { id: 3, name: '养生保健' },
      { id: 4, name: '儿科' },
      { id: 5, name: '骨科' },
      { id: 6, name: '皮肤科' },
      { id: 7, name: '营养科' },
      { id: 8, name: '其他' }
    ],
    selectedCategory: null,
    canPublish: false
  },

  onLoad(options) {
    this.setNavBarHeight();
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

  // 返回上一页
  goBack() {
    wx.navigateBack({
      fail: () => {
        wx.switchTab({
          url: '/pages/profile/profile'
        });
      }
    });
  },

  // 选择视频
  chooseVideo() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['video'],
      sourceType: ['album', 'camera'],
      maxDuration: 180, // 最长3分钟
      camera: 'back',
      success: (res) => {
        const tempFile = res.tempFiles[0];
        const duration = Math.round(tempFile.duration);
        const size = (tempFile.size / 1024 / 1024).toFixed(2);
        
        this.setData({
          'videoInfo.tempFilePath': tempFile.tempFilePath,
          'videoInfo.duration': duration,
          'videoInfo.size': size
        });
        
        this.checkCanPublish();
        
        wx.showToast({
          title: '视频已选择',
          icon: 'success'
        });
      },
      fail: (err) => {
        if (err.errMsg !== 'chooseMedia:fail cancel') {
          wx.showToast({
            title: '选择视频失败',
            icon: 'none'
          });
        }
      }
    });
  },

  // 标题输入
  onTitleInput(e) {
    const title = e.detail.value;
    this.setData({
      title,
      titleLength: title.length
    });
    this.checkCanPublish();
  },

  // 分类选择
  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      selectedCategory: id
    });
    this.checkCanPublish();
  },

  // 检查是否可以发布
  checkCanPublish() {
    const { videoInfo, title, selectedCategory } = this.data;
    const canPublish = videoInfo.tempFilePath && title.trim().length > 0 && title.length <= 24 && selectedCategory;
    this.setData({ canPublish });
  },

  // 发布视频
  onPublish() {
    if (!this.data.canPublish) {
      let msg = '';
      if (!this.data.videoInfo.tempFilePath) {
        msg = '请先上传视频';
      } else if (!this.data.title.trim()) {
        msg = '请输入视频标题';
      } else if (this.data.title.length > 24) {
        msg = '标题不能超过24个字';
      } else if (!this.data.selectedCategory) {
        msg = '请选择视频分类';
      }
      
      wx.showToast({
        title: msg,
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '发布中...',
      mask: true
    });

    // 模拟上传过程
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      });

      // 2秒后返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 2000);
    }, 1500);
  },

  onShareAppMessage() {
    return {
      title: '发布健康科普视频',
      path: '/pages/profile/profile'
    };
  }
});

