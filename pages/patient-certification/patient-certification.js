// pages/patient-certification/patient-certification.js
Page({
  data: {
    phone: ''
  },

  onLoad(options) {
    
  },

  // 输入手机号
  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 提交认证申请
  submitCertification() {
    const { phone } = this.data

    // 表单验证
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    // 显示加载提示
    wx.showLoading({
      title: '提交中...',
      mask: true
    })

    // 模拟提交（实际项目中应该上传到服务器）
    setTimeout(() => {
      wx.hideLoading()

      // 保存患者信息到本地
      const patientInfo = {
        phone: phone
      }

      wx.setStorageSync('certStatus', 'patient')
      wx.setStorageSync('patientInfo', patientInfo)

      wx.showModal({
        title: '认证成功',
        content: '您已成功完成患者认证！',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            // 返回个人中心页面
            wx.navigateBack({
              delta: 2
            })
          }
        }
      })
    }, 1500)
  }
})

