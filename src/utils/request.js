/**
 * 配置拦截器及其他，
 * 封装request.js
 */

import axios from 'axios'
import router from '@/router' // 引入实例化路由

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn' // 配置基地址
// 请求拦截去
axios.interceptors.request.use(function (config) {
  // 请求成功时做的事
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}` // 注入同一的token令牌
  return config
}, function (error) {
  // 请求失败做的事
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 请求成功做的事
// 操作响应回来的数据
  return response.data ? response.data : {}
}, function (error) {
  // 判断响应回来的数据
  if (error.response.status === 401) {
    localStorage.removeItem('user-token') // 删除令牌
    // 强制跳转到登录页面
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
