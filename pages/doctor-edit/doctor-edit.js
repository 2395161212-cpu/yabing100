// pages/doctor-edit/doctor-edit.js
Page({
  data: {
    doctorInfo: null,
    formData: {
      hospital: '',
      department: '',
      title: '',
      phone: '',
      email: ''
    },
    isEditMode: false  // 全局编辑模式
  },

  onLoad(options) {
    this.loadDoctorInfo()
  },

  // 加载医生信息
  loadDoctorInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    const doctorInfo = wx.getStorageSync('doctorInfo')
    
    if (doctorInfo) {
      this.setData({
        doctorInfo: doctorInfo,
        'formData.hospital': doctorInfo.hospital || '',
        'formData.department': doctorInfo.department || '',
        'formData.title': doctorInfo.title || '',
        'formData.phone': doctorInfo.phone || '',
        'formData.email': doctorInfo.email || 'username@service.com'
      })
    }
  },

  // 进入编辑模式
  enterEditMode() {
    this.setData({
      isEditMode: true
    })
  },

  // 输入事件
  onInputChange(e) {
    const field = e.currentTarget.dataset.field
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  // 保存所有信息
  saveAllInfo() {
    const { hospital, department, title } = this.data.formData
    
    // 验证必填项
    if (!hospital) {
      wx.showToast({
        title: '请输入医院信息',
        icon: 'none'
      })
      return
    }

    if (!department) {
      wx.showToast({
        title: '请输入科室信息',
        icon: 'none'
      })
      return
    }

    if (!title) {
      wx.showToast({
        title: '请输入职称信息',
        icon: 'none'
      })
      return
    }

    // 更新医生信息
    const doctorInfo = { ...this.data.doctorInfo }
    doctorInfo.hospital = hospital
    doctorInfo.department = department
    doctorInfo.title = title
    
    wx.setStorageSync('doctorInfo', doctorInfo)
    
    this.setData({
      doctorInfo: doctorInfo,
      isEditMode: false
    })

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
  },

  // 编辑手机号
  editPhone() {
    wx.showModal({
      title: '提示',
      content: '修改手机号需要验证，是否继续？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '功能开发中',
            icon: 'none'
          })
        }
      }
    })
  },

  // 编辑邮箱
  editEmail() {
    wx.showModal({
      title: '提示',
      content: '修改邮箱需要验证，是否继续？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '功能开发中',
            icon: 'none'
          })
        }
      }
    })
  }
})

