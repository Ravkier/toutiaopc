/**
 * 添加axios请求拦截器及其他，
 * 处理token令牌过期
 */

import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn' // 配置基地址
axios.interceptors.request.use(function (config) {
  // 请求成功时做的事
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}` // 注入同一的token令牌
  return config
}, function (error) {
  // 请求失败做的事
  return Promise.reject(error)
})
export default axios
