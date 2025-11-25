// pages/profile/profile.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
      city: '',
      province: '',
      country: ''
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile')
  },

  onLoad(options) {
    // 尝试从缓存获取用户信息
    this.loadUserInfo()
  },

  onShow() {
    // 每次显示页面时检查用户信息
    this.loadUserInfo()
  },

  // 从缓存加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.nickName) {
      this.setData({
        userInfo: {
          avatarUrl: userInfo.avatarUrl || defaultAvatarUrl,
          nickName: userInfo.nickName,
          city: userInfo.city || '',
          province: userInfo.province || '',
          country: userInfo.country || ''
        },
        hasUserInfo: true
      })
      console.log('✅ 已加载用户信息')
      console.log('昵称：', userInfo.nickName)
      console.log('头像URL：', userInfo.avatarUrl)
      console.log('城市：', userInfo.city || '未设置')
    } else {
      // 重置为未登录状态
      this.setData({
        userInfo: {
          avatarUrl: defaultAvatarUrl,
          nickName: '',
          city: '',
          province: '',
          country: ''
        },
        hasUserInfo: false
      })
      console.log('❌ 用户未登录，显示默认头像')
    }
  },

  // 获取用户信息（登录）
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log('🎉 获取用户信息成功')
        console.log('完整返回数据：', res)
        
        const userInfo = res.userInfo
        console.log('用户昵称：', userInfo.nickName)
        console.log('用户头像：', userInfo.avatarUrl)
        console.log('用户性别：', userInfo.gender)
        console.log('用户城市：', userInfo.city)
        
        // 更新页面数据
        this.setData({
          userInfo: {
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            gender: userInfo.gender,
            city: userInfo.city,
            province: userInfo.province,
            country: userInfo.country
          },
          hasUserInfo: true
        })
        
        // 保存到本地缓存
        wx.setStorageSync('userInfo', {
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          gender: userInfo.gender,
          city: userInfo.city,
          province: userInfo.province,
          country: userInfo.country
        })
        
        console.log('✅ 用户信息已保存到缓存')
        
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (err) => {
        console.log('❌ 获取用户信息失败', err)
        wx.showToast({
          title: '登录已取消',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  // 跳转到日志页面
  navigateToLogs() {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },

  // 菜单点击事件
  onMenuClick(e) {
    const type = e.currentTarget.dataset.type
    console.log('点击菜单：', type)
    
    wx.showToast({
      title: '功能开发中',
      icon: 'none',
      duration: 1500
    })
    
    // 这里可以根据不同的 type 跳转到不同的页面
    // switch(type) {
    //   case 'orders':
    //     wx.navigateTo({ url: '/pages/orders/orders' })
    //     break
    //   case 'favorites':
    //     wx.navigateTo({ url: '/pages/favorites/favorites' })
    //     break
    //   case 'settings':
    //     wx.navigateTo({ url: '/pages/settings/settings' })
    //     break
    //   case 'about':
    //     wx.navigateTo({ url: '/pages/about/about' })
    //     break
    // }
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      confirmText: '退出',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 清除缓存的用户信息
          wx.removeStorageSync('userInfo')
          
          // 重置为未登录状态
          this.setData({
            userInfo: {
              avatarUrl: defaultAvatarUrl,
              nickName: '',
              city: '',
              province: '',
              country: ''
            },
            hasUserInfo: false
          })
          
          wx.showToast({
            title: '已退出登录',
            icon: 'success',
            duration: 1500
          })
          
          console.log('🚪 用户已退出登录')
        }
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '我的小程序',
      path: '/pages/home/home'
    }
  }
})

