<template>
  <div class="info">
    <!-- 头部 -->
    <my-nav-bar
      title="个人信息"
      rightText="保存"
      @click-right="save"
    ></my-nav-bar>
    <!-- 内容区域 -->
    <van-cell-group>
      <van-cell title="头像" @click="upload" is-link>
        <template #default>
          <img class="myimg" :src="user.photo" alt="" />
        </template>
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link @click="openName">
      </van-cell>
      <van-cell title="介绍" is-link> </van-cell>
      <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        is-link
        @click="openSex"
      >
      </van-cell>
      <van-cell
        title="生日"
        :value="user.birthday"
        is-link
        @click="openBirthday"
      >
      </van-cell>
    </van-cell-group>
    <!-- 昵称修改区域 -->
    <van-popup v-model="nameshow" position="bottom" :style="{ height: '8%' }">
      <van-field
        v-model="user.name"
        required
        label="昵称"
        placeholder="请输入昵称"
      />
    </van-popup>
    <!-- 性别修改区域 -->
    <van-popup
      v-model="gendershow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        title="性别"
        :columns="columns"
        :default-index="defaultIndex"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 生日修改区域 -->
    <van-popup
      v-model="birthdayshow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirm"
      />
    </van-popup>
    <upload ref="uploadRef" />
  </div>
</template>

<script>
import MyNavBar from '../../components/MyNavBar'
import { getUserProfile, updateUserProfile } from '@/api/user'
import upload from './upload'
import dayjs from 'dayjs'
export default {
  components: {
    MyNavBar,
    upload
  },
  data () {
    return {
      user: {},
      nameshow: false, // 昵称是否显示
      birthdayshow: false, // 生日是否显示
      gendershow: false, // 性别是否显示
      defaultIndex: 1,
      columns: ['男', '女'],
      minDate: new Date(1940, 1, 1),
      maxDate: new Date(2021, 12, 30),
      currentDate: new Date()
    }
  },
  mounted () {
    this.getUserProfileData()
  },
  methods: {
    openName () {
      this.nameshow = true
    },
    openSex () {
      this.defaultIndex = this.user.gender

      this.gendershow = true
    },
    openBirthday () {
      this.currentDate = new Date(this.user.birthday)

      this.birthdayshow = true
    },
    confirm (value) {
      const date = dayjs(value).format('YYYY-MM-DD')
      this.user.birthday = date

      this.birthdayshow = false
    },
    onConfirm (value, index) {
      this.user.gender = index

      this.gendershow = false
    },
    async getUserProfileData () {
      const res = await getUserProfile()

      this.user = res.data
    },
    upload () {
      this.$refs.uploadRef.show = true
    },
    async save () {
      await updateUserProfile({
        name: this.user.name,
        gender: this.user.gender,
        birthday: this.user.birthday
      })

      this.$toast.success('用户信息修改成功')
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  .mygroup {
    margin-top: 20px;
  }
  .myimg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>
