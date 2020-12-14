<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-form @submit="onSubmit">
        <van-field
          :rules="[{ validator: phoneValidator, message: '手机号不合法' }]"
          v-model="form.mobile"
          placeholder="请输入手机号"
        >
          <template #left-icon>
            <i class="iconfont icon-shouji"></i>
          </template>
        </van-field>
        <van-field
          :rules="[{ required: true, message: '验证码不能为空' }]"
          v-model="form.code"
          placeholder="请输入验证码"
        >
          <template #left-icon>
            <i class="iconfont icon-lock"></i>
          </template>
          <template #button>
            <van-button class="getCode" size="small" color="#ededed"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setToken } from '@/utils/token'
export default {
  data () {
    return {
      form: {
        mobile: '13999999999',
        code: '246810'
      }
    }
  },
  methods: {
    phoneValidator (val) {
      return /^1[3456789][0-9]{9}$/.test(val)
    },
    async onSubmit () {
      try {
        const res = await login(this.form)

        if (res.message === 'OK') {
          // 保存token到本地
          setToken(JSON.stringify(res.data))

          // 路由跳转
          this.$router.push('/layout')
        }
      } catch (error) {
        // console.log('error is', error)
        this.$toast.fail('登录失败~')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3e9df8;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}
.iconfont {
  font-size: 20px;
}

.getCode {
  border-radius: 12px;
  /deep/ .van-button__text {
    color: #666;
  }
}
</style>
