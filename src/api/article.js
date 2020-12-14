import request from '@/utils/request'

/**
 * 根据频道id，获取频道id下的列表
 * @param {*} channelId 频道id
 */
export const getArticleListById = channelId => {
  return request({
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp: Date.now(),
      with_top: 0
    }
  })
}

/**
 * 对文章不喜欢
 * @param {*} data
 */
export const dislikeArticle = data => {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data
  })
}

/**
 * 举报文章
 */
export const reportArticle = data => {
  return request({
    url: '/app/v1_0/article/reports',
    method: 'POST',
    data
  })
}
