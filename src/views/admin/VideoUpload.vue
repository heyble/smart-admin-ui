<template>
  <div class="main">
    <div class="info">info-{{videoInfo.name}}</div>
    <el-divider></el-divider>
    <div class="maintain">
      <upload :uploadText="uploadText" @uploaded="uploaded"></upload>
    </div>
  </div>
</template>

<script>
import upload from '@/components/upload.vue'
import axios from 'axios'
export default {
  data() {
    return {
      uploadText: '上传影片',
      videoInfo: {}
    }
  },
  components: {
    upload
  },
  methods: {
    uploaded(data) {
      console.log('上传完毕', data)
      this.videoInfo.fileId = data.data.data.id
      this.updateVideoInfo()
    },
    updateVideoInfo() {
      axios({
        method: 'POST',
        url: '/smart/film/update',
        data: this.videoInfo
      }).then(res => {
        if (res.data.status === 200) {
          console.log('更新成功')
        }
      })
    }
  },
  mounted() {
    axios({
      method: 'GET',
      url: `/smart/film/${this.$route.params.id}`
    }).then(res => {
      this.videoInfo = res.data.data
      // console.log(res.data.data.files.pop())
      // this.vodeoFile = res.data.data.files.pop()
    })
  }
}
</script>

<style lang="scss" scoped>
* {
  display: flex;
}
.main {
  flex-direction: column;
  width: 80%;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
