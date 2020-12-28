import request from '@/utils/request'

export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

// 封装方法：得到用户的个人资料
export const getUserProfile = () => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}

// 封装方法：上传头像
export const uploadImg = file => {
  const formData = new FormData()
  formData.append('photo', file)

  return request({
    url: 'app/v1_0/user/photo',
    method: 'PATCH',
    data: formData
  })
}

/**
 * 保存用户信息
 */
export const updateUserProfile = data => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
