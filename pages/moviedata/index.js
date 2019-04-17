//logs.js
const util = require('../../utils/util.js')
import ty from '../../utils/request'
Page({
  data: {
    list: null
  },

  onLoad: function () {
    this.getlist()
    setInterval(() => {
      this.getlist()
    }, 1000)
  },
  getlist() {
    ty.request({
      url: 'https://box.maoyan.com/promovie/api/box/second.json',
    }).then((res) => {
      this.setData({
        list: res.data.data
      })
    }).catch((err) => {
      console.log(err)
    })
  }

})
