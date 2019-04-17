// pages/components/header/index.js
import ty from '../../../utils/request'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    movieimg: 'https://p1.meituan.net/128.180/movie/94b9bfc5ffeea6d6e362395992f547762041095.jpg',
    movieList: [],
    imgList: false,
    movieIds: [],
    start: 12,
    end: 23
  },
  attached() {
    this.getMovieList()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 进入详情页
    toItem(evt) {
      let idx = evt.currentTarget.dataset.index
      let mid = this.data.movieList[idx].id
      wx.navigateTo({
        url: `/pages/movieItem/index?movieId=${mid}`
      })
    },
    // 上拉加载
    onReachBottom() {
      let start = this.data.start
      let end = this.data.end
      let id = this.data.movieIds.slice(start, end).toString()
      if (id !== '') {
        ty.request({
          url: 'https://m.maoyan.com/ajax/moreComingList',
          data: {
            token: '',
            movieIds: id
          }
        }).then((res) => {
          this.setData({
            movieList: [...this.data.movieList, ...res.data.coming],
            start: this.data.start + 12,
            end: this.data.end + 11
          })
          for (var i = 0; i < this.data.movieList.length; i++) {
            this.data.movieList[i].img = this.data.movieList[i].img.replace('w.h', '128.180')
            this.setData({
              movieList: this.data.movieList,
            })
          }
          // this.setData({
          //   imgList: true
          // })
        }).catch((err) => {
          console.log(err)
        })
      } else {
        wx.showToast({
          title: '到底了～～',
          icon: 'none',
          duration: 3000
        })
      }
    },
    // 获取数据列表
    getMovieList() {
      ty.request({
        url: 'https://m.maoyan.com/ajax/movieOnInfoList'
      }).then((res) => {
        this.setData({
          movieIds: res.data.movieIds,
          movieList: res.data.movieList
        })
        console.log(res.data)
        for (var i = 0; i < this.data.movieList.length; i++) {
          this.data.movieList[i].img = this.data.movieList[i].img.replace('w.h', '128.180')
          this.setData({
            movieList: this.data.movieList,
          })
        }
        this.setData({
          imgList: true
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})
