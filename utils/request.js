
export default {
  request(options = {}) {
    const {
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success,
      fail,
      complete
    } = options;
  
    return new Promise((res, rej) => {
      wx.request({
        url,
        data,
        header,
        method,
        dataType,
        responseType,
        success(r) {
          res(r);
        },
        fail(err) {
          rej(err);
        },
        complete
      });
    });
  }
}