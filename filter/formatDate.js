/* eslint-disable eqeqeq */
export default {
  buildDate(str) {
    if (str instanceof Date) {
      return str
    }
    if (typeof str == 'number') {
      return new Date(str)
    }
    if (!str) {
      return null
    }
    if (str.indexOf('+') >= 0) {
      str = str.replace('+0800 ', '')
    }
    str = str.replace(/-/g, '/')
    return new Date(str)
  },
  /**
   * yyyy-MM-dd HH:mm
   * @param {Date| number | str} dataStr
   * @param {Object} pattern
  */
  format(dataStr, pattern) {
    let date = this.buildDate(dataStr)
    if (!date) {
      return
    }
    let hour = date.getHours()
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': hour,
      'h+': (hour > 12 ? hour - 12 : hour),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(pattern)) {
      pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (let k in o) {
      if (new RegExp('(' + k + ')').test(pattern)) {
        pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }

    return pattern
  },

  between(bet) {
    bet = Math.abs(parseInt(bet))
    bet = bet == 0 ? 1 : bet
    if (bet < 60) {
      return bet + '秒'
    }
    if (bet < 3600) {
      return parseInt(bet / 60) + '分钟'
    }
    if (bet < 3600 * 24) {
      return parseInt(bet / 3600) + '小时'
    }
    if (bet < 3600 * 24 * 30) {
      return parseInt(bet / (3600 * 24)) + '天'
    }
    if (bet < 3600 * 24 * 30 * 12) {
      return parseInt(bet / (3600 * 24 * 30)) + '月'
    }
    return parseInt(bet / (3600 * 24 * 30 * 12)) + '年'
  },

}
