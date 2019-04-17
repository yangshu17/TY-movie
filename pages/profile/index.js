// pages/profile/index.js
import ty from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getInfo()
  },
  bindGetUserInfo(res) {
    console.log(res)
    if (res.detail.userInfo) {
      this.setData({
        isLogin: true,
        userInfo: res.detail.userInfo
      })
    } else {
      wx.showToast({
        title: '不登陆没法看好看的哦～',
        icon: 'none',
        duration: 3000
      })
    }
  },
  getInfo() {
    console.log(17265)
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          isLogin: true,
          userInfo: res.userInfo
        })
      },
      fail(e) {
        console.log(123)
      }
    })
    // wx.getSetting({
    //   success(res) {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success() {
    //         }
    //       })
    //     }
    //   },
    //   fail(e) {
    //     console.log(e)
    //   }
    // })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})