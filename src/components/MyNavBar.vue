<template>
  <div class="my-nav-bar">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="$router.back()"
      :right-text="rightText"
      @click-right="onClickRight"
    >
      <template #left>
        <van-icon name="arrow-left" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    rightText: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClickRight () {
      this.$emit('click-right')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar__content {
  background-color: #3e9df8;
}
/deep/ .van-nav-bar__title {
  color: #fff;
}
.van-icon-arrow-left {
  color: #fff;
  font-size: 16px;
}
::v-deep .van-nav-bar__text {
  color: #fff;
}
</style>
