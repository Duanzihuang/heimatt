<template>
  <div>
    <!-- 嵌套路由 -->
    <div class="content">
      <router-view></router-view>
    </div>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/layout/home">主页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/layout/question"
        >问答</van-tabbar-item
      >
      <van-tabbar-item icon="tv-o" to="/layout/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/layout/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
.content {
  padding-bottom: 50px;
}
</style>
