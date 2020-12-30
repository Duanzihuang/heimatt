import request from '@/utils/request'

/**
 * 获取登录用户的频道列表
 */
export const getChannels = () => {
  return request({
    url: '/app/v1_0/user/channels'
  })
}

/**
 * 获取所有频道数据
 */
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels'
  })
}

/**
 * 批量修改用户频道列表（重置式）
 */
export const updateChannels = channels => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}
