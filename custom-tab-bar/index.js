Component({
  data: {
    selected: 0,
    color: "#6F6F6F",
    selectedColor: "#1296DB",
    list: [
      {
        pagePath: "/pages/home/home",
        text: "健康科普",
        iconPath: "/images/popular-science.png",
        selectedIconPath: "/images/popular-science.png"
      },
      {
        pagePath: "/pages/discover/discover",
        text: "学习中心",
        iconPath: "/images/learn-center.png",
        selectedIconPath: "/images/learn-center.png"
      },
      {
        pagePath: "/pages/profile/profile",
        text: "我的",
        iconPath: "/images/my.png",
        selectedIconPath: "/images/my.png"
      }
    ]
  },
  
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const index = data.index
      
      // 先更新选中状态，提供即时视觉反馈
      this.setData({
        selected: index
      })
      console.log(url)

      if (url === '/pages/discover/discover') return;
      
      // 执行页面跳转
      wx.switchTab({
        url: url,
        fail: (err) => {
          console.error('Tab切换失败:', err)
          console.log('尝试跳转的路径:', url)
        }
      })
    }
  }
})

