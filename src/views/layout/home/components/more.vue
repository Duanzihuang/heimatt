<template>
  <van-popup class="popup" v-model="show" :style="{ width: '90%' }">
    <van-cell-group v-if="!isReport">
      <van-cell icon="failure" title="不感兴趣" @click="dislike" />
      <van-cell
        icon="warning-o"
        title="反馈垃圾内容"
        is-link
        @click="isReport = true"
      />
      <van-cell icon="delete" title="拉黑作者" />
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport = false" />
      <van-cell
        v-for="item in reportTypes"
        :key="item.type"
        :title="item.name"
        @click="report(item.type)"
      />
    </van-cell-group>
  </van-popup>
</template>

<script>
import { dislikeArticle, reportArticle } from '@/api/article'
export default {
  name: 'More',
  data () {
    return {
      artId: null, // 文章id
      show: false, // 是否展示
      isReport: false, // 是否显示举报
      reportTypes: [
        // 举报类型
        {
          type: 0,
          name: '其它问题'
        },
        {
          type: 1,
          name: '标题夸张'
        },
        {
          type: 2,
          name: '低俗色情'
        },
        {
          type: 3,
          name: '错别字多'
        },
        {
          type: 4,
          name: '旧闻重复'
        },
        {
          type: 5,
          name: '广告软文'
        },
        {
          type: 6,
          name: '内容不实'
        },
        {
          type: 7,
          name: '涉嫌违法犯罪'
        },
        {
          type: 8,
          name: '侵权'
        }
      ]
    }
  },
  methods: {
    // 对文章不喜欢
    async dislike () {
      this.show = false

      // 传递给父组件，让父组件从数组中删除
      this.$emit('dislike', this.artId)

      // 调用方法，发送请求
      await dislikeArticle({ target: this.artId })
    },
    async report (type) {
      await reportArticle({ target: this.artId, type })

      // 提示
      this.$toast.success('举报成功~')

      // 关闭对话框
      this.show = false
      this.isReport = false
    }
  }
}
</script>

<style lang="less" scoped>
.popup {
  border-radius: 6px;
}
</style>
