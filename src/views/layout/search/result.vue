<template>
  <div>
    <!-- 导航栏部分 -->
    <my-nav-bar title="搜索结果"></my-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="item in searchResultList" :key="item.art_id">
        <van-cell>
          <!-- 标题部分 -->
          <h4>{{ item.title }}</h4>
          <!-- 图片部分 -->
          <van-grid
            :border="false"
            :column-num="3"
            v-if="item.cover.images.length > 0"
          >
            <van-grid-item v-for="subitem in item.cover.images" :key="subitem">
              <van-image :src="subitem" />
            </van-grid-item>
          </van-grid>
          <!-- 提示部分 -->
          <div>
            <span>{{ item.aut_name }}</span
            >&nbsp; <span>{{ item.comm_count }} 评论</span>&nbsp;
            <span>{{ item.pubdate }}</span>
          </div>
        </van-cell>
        <!-- 底部工具栏 -->
        <van-grid direction="horizontal" :column-num="3">
          <van-grid-item icon="comment-o" text="2" />
          <van-grid-item icon="like-o" text="点赞" />
          <van-grid-item icon="exchange" text="分享" />
        </van-grid>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/other'
import MyNavBar from '@/components/MyNavBar'
export default {
  name: 'Search',
  components: {
    MyNavBar
  },
  data () {
    return {
      query: {
        page: 0,
        per_page: 10,
        q: this.$route.params.keyword
      },
      searchResultList: [],
      loading: false, // 是否加载中
      finished: false // 是否加载完毕
    }
  },
  mounted () {
    // this.getSearchResultListData()
  },
  methods: {
    async onLoad () {
      this.query.page++

      const res = await getSearchResult(this.query)

      // 拼接内容
      this.searchResultList = [...this.searchResultList, ...res.data.results]
      // 设置状态为false
      this.loading = false
      // 判断是否结束
      if (this.searchResultList.length === res.data.total_count) {
        this.finished = true
      }
    }
  }
}
</script>
