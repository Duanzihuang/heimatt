/**
 * 这个文件是对token的一个处理
 */
const KEY = 'heimatt_token'

// 保存token
const setToken = token => {
  localStorage.setItem(KEY, token)
}

// 获取token
const getToken = () => {
  // return 不要少了
  return localStorage.getItem(KEY)
}

// 删除token
const removeToken = () => {
  localStorage.removeItem(KEY)
}

// 按需导出【好处：可以根据需要导出一个或是多个】
// 这里的{}，就是一个语法，暂时不要理解成对象
export { setToken, getToken, removeToken }
