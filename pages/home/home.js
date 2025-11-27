// pages/home/home.js
Page({
  data: {
    banners: [],
    navItems: [],
    categories: [],
    activeCategory: 0,
    activeNav: 0, // 当前激活的金刚位（默认激活科普视频）
    videos: [],
    page: 1,
    pageSize: 10,
    loading: false,
    hasMore: true,
    statusBarHeight: 0, // 状态栏高度
    navBarHeight: 0, // 整个导航栏高度（状态栏 + 自定义导航栏）
    // 科普名医相关
    doctorCategories: [
      { id: 0, name: '心脑血管' },
      { id: 1, name: '糖尿病' },
      { id: 2, name: '秋冬养生' },
      { id: 3, name: '失眠' },
      { id: 4, name: '小儿消化' }
    ],
    activeDoctorCategory: 0,
    doctors: [],
    doctorPage: 1,
    doctorPageSize: 6,
    doctorLoading: false,
    doctorHasMore: true,
    // 科普之星相关
    starCategories: [
      { id: 0, name: '推荐' },
      { id: 1, name: '热门' },
      { id: 2, name: '新人' },
      { id: 3, name: '专家' }
    ],
    activeStarCategory: 0,
    stars: [],
    starPage: 1,
    starPageSize: 6,
    starLoading: false,
    starHasMore: true
  },

  onLoad(options) {
    this.setNavBarHeight();
    this.initData();
    this.loadVideos();
    this.loadDoctors();
    this.loadStars();
  },

  // 设置导航栏高度
  setNavBarHeight() {
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = systemInfo.statusBarHeight || 0;
    const navBarHeight = statusBarHeight + 44; // 44 是导航栏内容区域的高度
    
    this.setData({
      statusBarHeight: statusBarHeight,
      navBarHeight: navBarHeight
    });
  },

  // 初始化Banner和金刚位数据
  initData() {
    // Banner数据
    const banners = [
      { id: 1, image: '/images/banner.png' }
    ];

    // 金刚位数据
    const navItems = [
      { id: 0, icon: '/images/kingkongone.png', name: '科普视频' },
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
        cover: `https://placehold.co/350x380/3b82f6/white?text=视频${index}`,
        title: `健康科普知识第${index}期 - 专家讲解${fileName}相关医学知识`,
        author: `张医生${index}`,
        avatar: `https://placehold.co/44x44/4a90e2/white?text=医`,
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
    const activeNav = this.data.activeNav;
    if (activeNav === 0) {
      this.loadVideos();
    } else if (activeNav === 1) {
      this.loadDoctors();
    } else if (activeNav === 2) {
      this.loadStars();
    }
  },

  // 页面上拉触底事件
  onReachBottom() {
    this.loadMore();
  },

  // 金刚位点击事件
  onNavTap(e) {
    const id = e.currentTarget.dataset.id;
    const nav = this.data.navItems.find(item => item.id === id);
    
    // CHTV 不响应点击
    if (id === 3) {
      return;
    }
    
    // 更新激活状态
    this.setData({
      activeNav: id
    });

    console.log(`切换到：${nav.name}`);
    
    // 这里可以根据不同的金刚位加载不同的内容
    // 例如：切换视频列表数据源等
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
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

  // 加载医生列表
  loadDoctors() {
    if (this.data.doctorLoading || !this.data.doctorHasMore) {
      return;
    }

    this.setData({ doctorLoading: true });

    setTimeout(() => {
      const newDoctors = this.generateMockDoctors(this.data.doctorPage, this.data.doctorPageSize);
      
      this.setData({
        doctors: [...this.data.doctors, ...newDoctors],
        doctorPage: this.data.doctorPage + 1,
        doctorLoading: false,
        doctorHasMore: newDoctors.length === this.data.doctorPageSize
      });
    }, 500);
  },

  // 生成模拟医生数据
  generateMockDoctors(page, pageSize) {
    const doctors = [];
    const startIndex = (page - 1) * pageSize;
    const names = ['王卫海', '李明华', '张建国', '刘志强', '陈晓东', '赵文博'];
    const departments = ['心血管内科', '内分泌科', '神经内科', '儿科', '骨科', '消化内科'];
    const hospitals = ['南方医科院大学', '北京协和医院', '上海交通大学医学院', '复旦大学附属医院', '中山大学附属医院', '浙江大学医学院'];
    const tags = ['心血管内科', '糖尿病专家', '神经科专家', '儿科专家', '骨科专家', '消化科专家'];
    
    // 模拟最多加载30个医生
    const totalDoctors = 30;
    const count = Math.min(pageSize, totalDoctors - startIndex);
    
    for (let i = 0; i < count; i++) {
      const index = startIndex + i;
      doctors.push({
        id: index + 1,
        name: names[index % names.length],
        avatar: `https://placehold.co/200x200/4a90e2/white?text=${names[index % names.length].charAt(0)}`,
        title: '主任医师',
        department: departments[index % departments.length],
        hospital: hospitals[index % hospitals.length],
        tag: tags[index % tags.length],
        introduction: '主任医师，医学博士，毕业于，临床经验8年。擅长：冠心病、不稳定型心绞痛、高血压、心力衰竭、动脉粥样硬化、高脂血症、早搏、卵圆孔未闭等。'
      });
    }
    
    return doctors;
  },

  // 医生分类切换
  onDoctorCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      activeDoctorCategory: id
    });
    console.log('切换医生分类:', this.data.doctorCategories[id].name);
  },

  // 医生卡片点击
  onDoctorTap(e) {
    const id = e.currentTarget.dataset.id;
    const doctor = this.data.doctors.find(item => item.id === id);
    
    if (doctor) {
      wx.navigateTo({
        url: `/pages/doctor-detail/doctor-detail?doctor=${encodeURIComponent(JSON.stringify(doctor))}`
      });
    } else {
      wx.showToast({
        title: '医生信息不存在',
        icon: 'none'
      });
    }
  },

  // 加载科普之星列表
  loadStars() {
    if (this.data.starLoading || !this.data.starHasMore) {
      return;
    }

    this.setData({ starLoading: true });

    setTimeout(() => {
      const newStars = this.generateMockStars(this.data.starPage, this.data.starPageSize);
      
      this.setData({
        stars: [...this.data.stars, ...newStars],
        starPage: this.data.starPage + 1,
        starLoading: false,
        starHasMore: newStars.length === this.data.starPageSize
      });
    }, 500);
  },

  // 生成模拟科普之星数据
  generateMockStars(page, pageSize) {
    const stars = [];
    const startIndex = (page - 1) * pageSize;
    const names = ['科普之星一', '科普之星二', '科普之星三', '科普之星四', '科普之星五', '科普之星六'];
    const departments = ['骨科', '妇产科', '皮肤科', '营养科', '眼科', '耳鼻喉科'];
    const hospitals = ['中山大学附属医院', '浙江大学医学院', '四川大学华西医院', '武汉大学人民医院', '南京大学医学院', '天津医科大学'];
    const tags = ['优质创作者', '热门推荐', '最佳科普奖', '人气之星', '新锐博主', '科普达人'];
    
    // 模拟最多加载30个科普之星
    const totalStars = 30;
    const count = Math.min(pageSize, totalStars - startIndex);
    
    for (let i = 0; i < count; i++) {
      const index = startIndex + i;
      stars.push({
        id: index + 1,
        name: names[index % names.length],
        avatar: `https://placehold.co/200x200/2563eb/white?text=星${index + 1}`,
        title: '副主任医师',
        department: departments[index % departments.length],
        hospital: hospitals[index % hospitals.length],
        tag: tags[index % tags.length],
        introduction: '副主任医师，医学硕士，从事临床工作多年。擅长：常见疾病诊治、健康科普传播，累计发布优质科普内容100+，获得患者一致好评。'
      });
    }
    
    return stars;
  },

  // 科普之星分类切换
  onStarCategoryTap(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      activeStarCategory: id
    });
    console.log('切换科普之星分类:', this.data.starCategories[id].name);
  },

  // 科普之星卡片点击
  onStarTap(e) {
    const id = e.currentTarget.dataset.id;
    const star = this.data.stars.find(item => item.id === id);
    
    if (star) {
      wx.navigateTo({
        url: `/pages/doctor-detail/doctor-detail?doctor=${encodeURIComponent(JSON.stringify(star))}`
      });
    } else {
      wx.showToast({
        title: '信息不存在',
        icon: 'none'
      });
    }
  },

  onShareAppMessage() {
    return {
      title: '发现精彩视频',
      path: '/pages/home/home'
    }
  }
})

