<template>
  <div>
    <div class="my">
      <!-- 作者信息区域 -->
      <div class="authbox">
        <div class="top">
          <div class="imgbox">
            <img :src="userInfo.photo" alt="" @click="$router.push('/info')" />
            <span @click="$router.push('/info')">{{ userInfo.name }}</span>
          </div>
          <div class="readbox">
            <div>今日阅读</div>
            <div>0分钟</div>
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div>{{ userInfo.art_count }}</div>
            <div>动态</div>
          </div>
          <div class="item">
            <div>{{ userInfo.follow_count }}</div>
            <div>关注</div>
          </div>
          <div class="item">
            <div>{{ userInfo.fans_count }}</div>
            <div>粉丝</div>
          </div>
        </div>
      </div>
      <!-- 收藏区域 -->
      <van-grid :column-num="3" :border="false">
        <van-grid-item icon="star-o" text="收藏"></van-grid-item>
        <van-grid-item icon="clock-o" text="历史"></van-grid-item>
        <van-grid-item icon="orders-o" text="作品"></van-grid-item>
      </van-grid>
      <!-- 消息区域 -->
      <van-cell-group>
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="用户反馈" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfoData()
  },
  methods: {
    async getUserInfoData () {
      const res = await getUserInfo()
      this.userInfo = res.data
    }
  }
}
</script>

<style lang="less" scope>
.my {
  .authbox {
    height: 200px;
    color: #fff;
    background-color: #3e9df8;
    .top {
      padding: 20px;
      position: relative;
      .imgbox {
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .readbox {
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0px;
        right: 0px;
        transform: translateY(50%);
        font-size: 12px;
        text-align: center;
        padding: 5px 7px;
        border-radius: 30px 0 0 30px;
      }
    }
    .bottom {
      display: flex;
      margin-top: 40px;
      .item {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
