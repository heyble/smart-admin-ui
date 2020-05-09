<template>
  <div>
    <el-container>
      <el-header style="height: 100px;padding: 0">
        <top></top>
      </el-header>

      <el-main class="main">
        <videoDetail :video-info="videoInfo"></videoDetail>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import top from '@/components/Top'
import videoDetail from '@/components/VideoDetail'
import axios from 'axios'
export default {
  data() {
    return {
      prop: ['id'],
      videoInfo: {},
      vodeoFile: {}
    }
  },
  components: {
    top,
    videoDetail
  },
  created() {
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
.main {
}
</style>
