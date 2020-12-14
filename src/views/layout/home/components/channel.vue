<template>
  <div>
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <h3>我的频道</h3>
      <van-grid>
        <van-grid-item
          v-for="item in channels"
          :key="item.id"
          :text="item.name"
        />
      </van-grid>
      <h3>推荐频道</h3>
      <van-grid>
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
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
  computed: {
    recommendChannels () {
      console.log(this.allChannels)
      // 获取我的频道中的所有id
      const ids = this.channels.map(item => item.id)

      // 从所有频道数组中过滤出我的频道中有的数据，剩下的就是推荐频道所需的数据了
      const recommendChannels = this.allChannels.filter(
        item => !ids.includes(item.id)
      )

      return recommendChannels
    }
  },
  data () {
    return {
      show: false, // 是否显示
      allChannels: [] // 所有频道
    }
  },
  created () {
    this.getAllChannelsData()
  },
  methods: {
    async getAllChannelsData () {
      const res = await getAllChannels()

      this.allChannels = res.data.channels
    }
  }
}
</script>
