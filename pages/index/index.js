//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabclick: 1
  },

  hotbind() {
    this.setData({
      tabclick: 1
    })
  },
  comingbind() {
    this.setData({
      tabclick: 2
    })
  },
  onLoad: function () {
  },
  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    this.selectComponent('#list').onReachBottom()
  },
})
