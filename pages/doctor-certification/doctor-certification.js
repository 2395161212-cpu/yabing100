// pages/doctor-certification/doctor-certification.js
Page({
  data: {
    formData: {
      name: '',           // 姓名
      phone: '',          // 联系电话
      address: '',        // 地址信息
      hospital: '',       // 医院
      gender: '',         // 性别
      position: '',       // 职务
      department: '',     // 所属科室
      title: '',          // 职称
      licensePhoto: '',   // 医师职业资格证照片
      introduction: ''    // 简介
    },
    genderOptions: ['男', '女'],
    departmentOptions: [
      '内科',
      '外科',
      '妇产科',
      '儿科',
      '眼科',
      '耳鼻喉科',
      '口腔科',
      '皮肤科',
      '骨科',
      '神经科',
      '心内科',
      '消化内科',
      '呼吸内科',
      '肾内科',
      '内分泌科',
      '血液科',
      '肿瘤科',
      '急诊科',
      '中医科',
      '康复科',
      '其他'
    ],
    genderIndex: -1,
    departmentIndex: -1
  },

  onLoad(options) {
    
  },

  // 输入姓名
  onNameInput(e) {
    this.setData({
      'formData.name': e.detail.value
    })
  },

  // 输入联系电话
  onPhoneInput(e) {
    this.setData({
      'formData.phone': e.detail.value
    })
  },

  // 输入地址
  onAddressInput(e) {
    this.setData({
      'formData.address': e.detail.value
    })
  },

  // 输入医院
  onHospitalInput(e) {
    this.setData({
      'formData.hospital': e.detail.value
    })
  },

  // 选择性别
  onGenderChange(e) {
    const index = e.detail.value
    this.setData({
      genderIndex: index,
      'formData.gender': this.data.genderOptions[index]
    })
  },

  // 输入职务
  onPositionInput(e) {
    this.setData({
      'formData.position': e.detail.value
    })
  },

  // 选择科室
  onDepartmentChange(e) {
    const index = e.detail.value
    this.setData({
      departmentIndex: index,
      'formData.department': this.data.departmentOptions[index]
    })
  },

  // 输入职称
  onTitleInput(e) {
    this.setData({
      'formData.title': e.detail.value
    })
  },

  // 输入简介
  onIntroductionInput(e) {
    this.setData({
      'formData.introduction': e.detail.value
    })
  },

  // 选择医师职业资格证照片
  chooseLicensePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        this.setData({
          'formData.licensePhoto': tempFilePath
        })
        wx.showToast({
          title: '照片已选择',
          icon: 'success'
        })
      },
      fail: (err) => {
        console.error('选择照片失败', err)
      }
    })
  },

  // 提交认证申请
  submitCertification() {
    const { name, phone, address, hospital, gender, position, department, title, licensePhoto, introduction } = this.data.formData

    // 表单验证
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }

    if (!phone) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
      return
    }

    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '联系电话格式不正确',
        icon: 'none'
      })
      return
    }

    if (!address) {
      wx.showToast({
        title: '请输入地址信息',
        icon: 'none'
      })
      return
    }

    if (!hospital) {
      wx.showToast({
        title: '请输入医院名称',
        icon: 'none'
      })
      return
    }

    if (!gender) {
      wx.showToast({
        title: '请选择性别',
        icon: 'none'
      })
      return
    }

    if (!position) {
      wx.showToast({
        title: '请输入职务',
        icon: 'none'
      })
      return
    }

    if (!department) {
      wx.showToast({
        title: '请选择所属科室',
        icon: 'none'
      })
      return
    }

    if (!title) {
      wx.showToast({
        title: '请输入职称',
        icon: 'none'
      })
      return
    }

    if (!licensePhoto) {
      wx.showToast({
        title: '请上传医师职业资格证',
        icon: 'none'
      })
      return
    }

    if (!introduction) {
      wx.showToast({
        title: '请输入简介',
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

      // 保存医生信息到本地（模拟审核通过）
      const doctorInfo = {
        name: name,
        phone: phone,
        address: address,
        hospital: hospital,
        gender: gender,
        position: position,
        department: department,
        title: title,
        licensePhotoUrl: licensePhoto,
        photoUrl: licensePhoto, // 使用资格证照片作为展示照片
        introduction: introduction
      }

      wx.setStorageSync('certStatus', 'doctor')
      wx.setStorageSync('doctorInfo', doctorInfo)

      wx.showModal({
        title: '提交成功',
        content: '您的认证申请已提交，我们会在3个工作日内完成审核',
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
    }, 2000)
  }
})

