// pages/profile/profile.js
const defaultAvatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: "",
      city: "",
      province: "",
      country: "",
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse("getUserProfile"),
    // 认证状态：null-未认证, 'pending'-审核中, 'doctor'-已认证医生, 'patient'-已认证患者
    certStatus: null,
    doctorInfo: null, // 医生信息
  },

  onLoad(options) {
    // 正常加载用户信息
    // this.clearTestData();
    // this.loadUserInfo();
    this.mockAuthStatus('doctor')   // 测试医生
    // this.mockAuthStatus('patient')  // 测试患者
    // this.mockAuthStatus('logged')   // 测试已登录未认证
    // this.mockAuthStatus('none')     // 测试未登录
  },

  // 清除测试数据
  clearTestData() {
    console.log("🗑️ 正在清除测试数据...");
    wx.removeStorageSync("userInfo");
    wx.removeStorageSync("certStatus");
    wx.removeStorageSync("doctorInfo");
    wx.removeStorageSync("patientInfo");
    console.log("✅ 测试数据已清除");
  },

  /**
   * 模拟认证状态（测试用）
   * @param {string} status - 'none' | 'logged' | 'doctor' | 'patient'
   */
  mockAuthStatus(status) {
    console.log("🔧 模拟认证状态:", status);

    switch (status) {
      case "none":
        // 未登录状态
        wx.removeStorageSync("userInfo");
        wx.removeStorageSync("certStatus");
        wx.removeStorageSync("doctorInfo");
        wx.removeStorageSync("patientInfo");
        console.log("✅ 已设置为：未登录");
        break;

      case "logged":
        // 已登录但未认证
        wx.setStorageSync("userInfo", {
          avatarUrl:
            "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
          nickName: "微信用户",
          city: "北京",
          province: "北京",
          country: "中国",
        });
        wx.removeStorageSync("certStatus");
        wx.removeStorageSync("doctorInfo");
        wx.removeStorageSync("patientInfo");
        console.log("✅ 已设置为：已登录未认证");
        break;

      case "doctor":
        // 已认证医生
        wx.setStorageSync("userInfo", {
          avatarUrl:
            "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
          nickName: "陶勇医生",
          city: "北京",
          province: "北京",
          country: "中国",
        });
        wx.setStorageSync("certStatus", "doctor");
        wx.setStorageSync("doctorInfo", {
          name: "陶勇",
          phone: "13800138000",
          address: "北京市朝阳区",
          hospital: "首都医科大学附属北京朝阳医院",
          gender: "男",
          position: "科室主任",
          department: "眼科",
          title: "主任医师",
          licensePhotoUrl: "/images/logo.png",
          photoUrl:
            "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
          introduction: "从事眼科临床工作多年，擅长各类眼科疾病的诊断和治疗",
        });
        console.log("✅ 已设置为：已认证医生");
        break;

      case "patient":
        // 已认证患者
        wx.setStorageSync("userInfo", {
          avatarUrl:
            "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0",
          nickName: "张三",
          city: "上海",
          province: "上海",
          country: "中国",
        });
        wx.setStorageSync("certStatus", "patient");
        wx.setStorageSync("patientInfo", {
          phone: "13900139000",
        });
        console.log("✅ 已设置为：已认证患者");
        break;

      default:
        console.log("❌ 无效的状态:", status);
    }

    // 加载数据
    this.loadUserInfo();
  },

  onShow() {
    // 每次显示页面时检查用户信息
    this.loadUserInfo();

    // 更新 tabBar 选中状态
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
    }
  },

  // 从缓存加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync("userInfo");
    const certStatus = wx.getStorageSync("certStatus") || null;
    const doctorInfo = wx.getStorageSync("doctorInfo") || null;

    if (userInfo && userInfo.nickName) {
      this.setData({
        userInfo: {
          avatarUrl: userInfo.avatarUrl || defaultAvatarUrl,
          nickName: userInfo.nickName,
          city: userInfo.city || "",
          province: userInfo.province || "",
          country: userInfo.country || "",
        },
        hasUserInfo: true,
        certStatus: certStatus,
        doctorInfo: doctorInfo,
      });
      console.log("✅ 已加载用户信息");
      console.log("昵称：", userInfo.nickName);
      console.log("认证状态：", certStatus);
    } else {
      // 重置为未登录状态
      this.setData({
        userInfo: {
          avatarUrl: defaultAvatarUrl,
          nickName: "",
          city: "",
          province: "",
          country: "",
        },
        hasUserInfo: false,
        certStatus: null,
        doctorInfo: null,
      });
      console.log("❌ 用户未登录，显示默认头像");
    }
  },

  // 获取用户信息（登录）
  getUserProfile() {
    wx.getUserProfile({
      desc: "用于完善会员资料",
      success: (res) => {
        console.log("🎉 获取用户信息成功");
        console.log("完整返回数据：", res);

        const userInfo = res.userInfo;
        console.log("用户昵称：", userInfo.nickName);
        console.log("用户头像：", userInfo.avatarUrl);
        console.log("用户性别：", userInfo.gender);
        console.log("用户城市：", userInfo.city);

        // 更新页面数据
        this.setData({
          userInfo: {
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            gender: userInfo.gender,
            city: userInfo.city,
            province: userInfo.province,
            country: userInfo.country,
          },
          hasUserInfo: true,
        });

        // 保存到本地缓存
        wx.setStorageSync("userInfo", {
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          gender: userInfo.gender,
          city: userInfo.city,
          province: userInfo.province,
          country: userInfo.country,
        });

        console.log("✅ 用户信息已保存到缓存");

        wx.showToast({
          title: "登录成功",
          icon: "success",
          duration: 2000,
        });
      },
      fail: (err) => {
        console.log("❌ 获取用户信息失败", err);
        wx.showToast({
          title: "登录已取消",
          icon: "none",
          duration: 2000,
        });
      },
    });
  },

  // 去认证
  goToCertification() {
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: "请先登录",
        icon: "none",
      });
      return;
    }

    wx.navigateTo({
      url: "/pages/cert-choice/cert-choice",
    });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      confirmText: "退出",
      cancelText: "取消",
      success: (res) => {
        if (res.confirm) {
          // 清除缓存的用户信息和认证信息
          wx.removeStorageSync("userInfo");
          wx.removeStorageSync("certStatus");
          wx.removeStorageSync("doctorInfo");
          wx.removeStorageSync("patientInfo");

          // 重置为未登录状态
          this.setData({
            userInfo: {
              avatarUrl: defaultAvatarUrl,
              nickName: "",
              city: "",
              province: "",
              country: "",
            },
            hasUserInfo: false,
            certStatus: null,
            doctorInfo: null,
          });

          wx.showToast({
            title: "已退出登录",
            icon: "success",
            duration: 1500,
          });

          console.log("🚪 用户已退出登录");
        }
      },
    });
  },

  onShareAppMessage() {
    return {
      title: "我的小程序",
      path: "/pages/home/home",
    };
  },
});
