// pages/movieItem/index.js
import ty from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailMovie: null,
    Comments: '',
    isShow: false,
    offset: 0,
    movieId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieId: options.movieId
    })
    this.getItem()
    this.getTalkList()
  },
  // 打开图片
  previewImg(event) {
    for (var i = 0; i < this.data.detailMovie.photos.length; i++) {
      this.data.detailMovie.photos[i] = this.data.detailMovie.photos[i].replace('210.160', '380.280')
      this.setData({
        detailMovie: this.data.detailMovie,
      })
    }
    var idx = event.currentTarget.dataset.index
    let cut = this.data.detailMovie.photos[idx]
    wx.previewImage({
      current: cut, // 当前显示图片的http链接
      urls: this.data.detailMovie.photos // 需要预览的图片http链接列表
    })
  },
  getItem() {
    ty.request({
      url: 'https://m.maoyan.com/ajax/detailmovie',
      data: {
        movieId: this.data.movieId
      }
    }).then((res) => {
      this.setData({
        detailMovie: res.data.detailMovie
      })
      console.log(res.data.detailMovie)
      this.data.detailMovie.img = this.data.detailMovie.img.replace('w.h', '128.180')
      for (var i = 0; i < this.data.detailMovie.photos.length; i++) {
        this.data.detailMovie.photos[i] = this.data.detailMovie.photos[i].replace('w.h', '210.160')
        this.setData({
          detailMovie: this.data.detailMovie,
        })
      }
      this.setData({
        isShow: true
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  getTalkList() {
    ty.request({
      url: 'https://m.maoyan.com/review/v2/comments.json',
      data: {
        movieId: this.data.movieId,
        userId: -1,
        offset: this.data.offset,
        limit: 15,
        ts: 0,
        type: 3
      }
    }).then((res) => {
      this.setData({
        Comments: res.data.data.hotComments,
        offset: this.data.offset + 15
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
    ty.request({
      url: 'https://m.maoyan.com/review/v2/comments.json',
      data: {
        movieId: this.data.movieId,
        userId: -1,
        offset: this.data.offset,
        limit: 15,
        ts: 0,
        type: 3
      }
    }).then((res) => {
      this.setData({
        Comments: [...this.data.Comments, ...res.data.data.comments],
        offset: this.data.offset + 15
      })
    }).catch((err) => {
      console.log(err)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})