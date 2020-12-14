import axios from 'axios'
import { getToken, removeToken } from './token'
import router from '@/router'
import JSONbig from 'json-bigint'

// 创建一个副本
const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  transformResponse: [
    function (data) {
      // Do whatever you want to transform the data

      return JSONbig.parse(data)
    }
  ]
})
// 请求拦截
request.interceptors.request.use(
  function (config) {
    const token = getToken()
    if (token) {
      config.headers.authorization = `Bearer ${JSON.parse(token).token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截
request.interceptors.response.use(
  function (res) {
    if (res.data.code === 403) {
      // token过期了
      removeToken() // 删除token

      // 跳转到登录页面
      router.push('/login')
    }
    return res.data
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default request
