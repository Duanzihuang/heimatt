import request from '@/utils/request'

// 得到联想的数据
export const suggestion = keyword => {
  return request({
    url: '/app/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}

// 获取搜索结果
export const getSearchResult = data => {
  return request({
    url: '/app/v1_0/search',
    params: data
  })
}
