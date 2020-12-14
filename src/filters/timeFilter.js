import Vue from 'vue'

import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime' // 按需加载插件

// 导入语言包
import 'dayjs/locale/zh-cn' // 按需加载

dayjs.extend(relativeTime) // 使用插件
dayjs.locale('zh-cn') // 全局使用

Vue.filter('fromTime', val => {
  return dayjs().from(val)
})
