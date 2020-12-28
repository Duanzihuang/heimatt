<template>
  <div class="channel">
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <van-cell title="我的频道">
        <template #default>
          <van-button
            v-if="!isEdit"
            class="mybtn"
            type="danger"
            size="mini"
            round
            plain
            @click="isEdit = true"
          >
            编辑
          </van-button>
          <van-button
            v-if="isEdit"
            class="mybtn"
            type="danger"
            size="mini"
            round
            plain
            @click="isEdit = false"
          >
            完成
          </van-button>
        </template>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item
          class="crossf"
          v-for="(item, index) in channels"
          :key="item.name"
        >
          <template #text>
            <!-- 频道文字 -->
            <span :class="['corssw', index === active ? 'activecss' : '']">{{
              item.name
            }}</span>
            <!-- 删除图标 -->
            <van-icon
              v-if="isEdit && index !== 0"
              class="crosss"
              name="clear"
              @click="deleteChannel(index)"
            ></van-icon>
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell title="频道推荐"></van-cell>
      <van-grid :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.name"
          :text="item.name"
          @click="addChannel(item)"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  props: {
    channels: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      show: false, // 是否显示
      allChannels: [], // 所有频道
      isEdit: false, // 是否编辑
      active: 0 // 正在编辑的我的频道的索引
    }
  },
  computed: {
    recommendChannels () {
      // console.log(this.allChannels)
      // 获取我的频道中的所有id
      const ids = this.channels.map(item => item.id)

      // 从所有频道数组中过滤出我的频道中有的数据，剩下的就是推荐频道所需的数据了
      const recommendChannels = this.allChannels.filter(
        item => !ids.includes(item.id)
      )

      return recommendChannels
    }
  },
  created () {
    this.getAllChannelsData()
  },
  methods: {
    // 获取所有频道数据
    async getAllChannelsData () {
      const res = await getAllChannels()

      this.allChannels = res.data.channels
    },
    // 添加频道到我的频道
    addChannel (item) {
      this.channels.push(item)
    },
    // 把我们的频道删除
    deleteChannel (index) {
      this.channels.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .mybtn {
    padding: 4px 15px;
    /deep/ span.van-button__text {
      line-height: 24px;
    }
  }
  .crossf {
    position: relative;
    .crosss {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 12px;
      color: #999;
    }
    .corssw {
      font-size: 12px;
      color: #646566;
    }
    .activecss {
      color: red;
    }
  }
}
</style>
