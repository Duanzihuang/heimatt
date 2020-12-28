// 保存到本地
export const localSave = (key, value) => {
  localStorage.setItem(key, value)
}

// 从本地获取
export const localGet = key => {
  return localStorage.getItem(key)
}

// 从本地删除
export const localDel = key => {
  localStorage.removeItem(key)
}
