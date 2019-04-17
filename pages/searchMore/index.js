// pages/searchMore/index.js
import ty from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputfocus: true,
    movieList: null,
    keywords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keywords: options.keywords
    })
    this.getList()
  },
  toItem(evt) {
    console.log(12312)
    let idx = evt.currentTarget.dataset.index
    let mid = this.data.movieList[idx].id
    wx.navigateTo({
      url: `/pages/movieItem/index?movieId=${mid}`
    })
  },
  getList() {
    ty.request({
      url: 'https://m.maoyan.com/searchlist/movies',
      data: {
        keyword: this.data.keywords,
        ci: 1,
        offset: 20,
        limit: 20
      }
    }).then((res) => {
      this.setData({
        movieList: res.data.movies
      })
      for (var i = 0; i < this.data.movieList.length; i++) {
        this.data.movieList[i].img = this.data.movieList[i].img.replace('w.h', '180.240')
        this.setData({
          movieList: this.data.movieList
        })
      }
      this.setData({
        isShow: true
      })
    }).catch((err) => {
      console.log(err)
    })
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