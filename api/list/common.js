import request from '../../utils/request'

//  获取水滴奖励信息
export const getInitial = (data) => {
  return request.needLogin.post('/api/frame/mina/summary/find-award', data, {
  })
}