// 保存到本地
export const localSet = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

// 从本地获取
export const localGet = key => {
  return JSON.parse(localStorage.getItem(key))
}

// 从本地删除
export const localDel = key => {
  localStorage.removeItem(key)
}
