<template>
  <div class="search">
    <van-search
      v-model="value"
      background="#3296fa"
      placeholder="请输入搜索关键词"
      :show-action="showAction"
      @focus="onFocus"
      @input="search"
      @search="onSearch"
      @cancel="onCancel"
    />
    <van-cell-group v-if="thinkList.length > 0">
      <van-cell title="联想区域"></van-cell>
      <van-cell
        icon="search"
        @click="onSearch(item.val)"
        v-for="item in thinkList"
        :key="item.val"
      >
        <template #default>
          <span v-html="item.title"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史区域">
        <template #right-icon>
          <van-icon name="delete" @click="clearHistory" />
        </template>
      </van-cell>
      <van-cell
        @click="onSearch(item)"
        v-for="(item, index) in historyList"
        :key="item"
        icon="search"
      >
        <template #default>{{ item }}</template>
        <template #right-icon>
          <van-icon name="cross" @click.stop="deleteHistory(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { suggestion } from '@/api/other'
import { localSet, localGet } from '@/utils/local'
export default {
  data () {
    return {
      value: '', // 搜索内容
      showAction: false,
      thinkList: [], // 联想区域
      historyList: JSON.parse(localGet('history') || '[]'), // 历史区域
      timer: null // 定时器
    }
  },
  methods: {
    onFocus () {
      this.showAction = true
    },
    search (val) {
      if (val.trim().length === 0) {
        this.thinkList = []
        return
      }

      clearTimeout(this.timer)

      this.timer = setTimeout(async () => {
        const res = await suggestion(val)

        this.thinkList = res.data.options.map(item => {
          return {
            val: item,
            title: item.replace(val, `<span style="color:red;">${val}</span>`)
          }
        })
      }, 500)
    },
    onSearch (val) {
      // 跳转之前，把点击的那项存到本地及
      this.historyList.unshift(val)

      // 去重
      this.historyList = [...new Set(this.historyList)]

      // 保存到本地
      localSet('history', JSON.stringify(this.historyList))

      this.$router.push(`/layout/search-result/${val}`)
    },
    onCancel () {
      this.showAction = false
    },
    // 删除某个搜索历史
    deleteHistory (index) {
      this.historyList.splice(index, 1)
      // 保存到本地
      localSet('history', JSON.stringify(this.historyList))
    },
    // 清空搜索历史
    clearHistory () {
      this.historyList = []
      // 保存到本地
      localSet('history', JSON.stringify(this.historyList))
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
