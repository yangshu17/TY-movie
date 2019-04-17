// pages/search/index.js
import ty from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputfocus: true,
    movieList: null,
    lasttime: 0,
    keywords: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toMore() {
    let keywords = this.data.keywords
    wx.navigateTo({
      url: `/pages/searchMore/index?keywords=${keywords}`
    })
  },
  toItem(evt) {
    let idx = evt.currentTarget.dataset.index
    let mid = this.data.movieList.list[idx].id
    console.log(mid)
    wx.navigateTo({
      url: `/pages/movieItem/index?movieId=${mid}`
    })
  },
  tosearch(evt) {
    this.setData({
      keywords: evt.detail.value
    })
    // let d = new Date()
    // let Nowtime = d.getTime()
    // if (Nowtime - this.data.lasttime > 1000) {
    //   setTimeout(()=>{
    //     this.getList()
    //   }, 500)
    //   this.data.lasttime = Nowtime
    // }
  },
  search(evt) {
    this.getList()
  },
  getList() {
    ty.request({
      url: 'https://m.maoyan.com/ajax/search',
      data: {
        kw: this.data.keywords,
        cityId: 1,
        stype: -1
      }
    }).then((res) => {
      this.setData({
        movieList: res.data.movies
      })
      for (var i = 0; i < this.data.movieList.list.length; i++) {
        this.data.movieList.list[i].img = this.data.movieList.list[i].img.replace('w.h', '180.240')
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