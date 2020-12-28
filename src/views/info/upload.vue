<template>
  <div class="upload">
    <van-popup class="mypop" v-model="show">
      <div @click="openfile" class="box">从相册中选择</div>
      <div style="display:none;">
        <input type="file" ref="fileRef" @change="imgChange" />
      </div>
      <div class="box">拍照</div>
      <div class="box" @click="show = false">取消</div>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { uploadImg } from '@/api/user'
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    openfile () {
      this.$refs.fileRef.click()
    },
    imgChange () {
      // console.log(this.$refs.fileRef.files[0])
      // 图片预览方式1
      // const imgPath = URL.createObjectURL(this.$refs.fileRef.files[0])
      // ImagePreview([imgPath])
      // ImagePreview({
      //   images: [imgPath],
      //   closeable: true
      // })

      // 图片预览方式2
      // 创建一个 fileRender 对象
      const reader = new FileReader()
      // 添加转换完成的事件
      reader.addEventListener('load', () => {
        // 转换成的base64图片
        const result = reader.result

        ImagePreview({
          images: [result],
          closeable: true,
          onClose: this.onClose
        })
      })
      //  开始转换
      reader.readAsDataURL(this.$refs.fileRef.files[0])
    },
    onClose () {
      this.show = false
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否将图片设置为头像',
          confirmButtonColor: '#3e9df8'
        })
        .then(async () => {
          const res = await uploadImg(this.$refs.fileRef.files[0])

          this.$parent.user.photo = res.data.photo
        })
        .catch(() => {
          console.log('取消...')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.upload {
  .mypop {
    width: 90%;
    border-radius: 5px;
    .box {
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
