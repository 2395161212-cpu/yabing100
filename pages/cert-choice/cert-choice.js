// pages/cert-choice/cert-choice.js
Page({
  data: {
    
  },

  onLoad(options) {
    
  },

  // 选择医生认证
  chooseDoctorCert() {
    wx.navigateTo({
      url: '/pages/doctor-certification/doctor-certification'
    })
  },

  // 选择患者认证
  choosePatientCert() {
    wx.navigateTo({
      url: '/pages/patient-certification/patient-certification'
    })
  }
})

