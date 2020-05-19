<template>
  <div class="home">
    <div class="title"></div>
    <div class="player">
      <d-player ref="player" :options="options"></d-player>
    </div>
    <div class="inputbox">
      <div class="inputbot-left">126人正在观看</div>
      <div class="inputbot-center">
        <el-input v-model="input" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-s-promotion"></el-button>
        </el-input>
      </div>
      <div class="inputbot-right">弹幕礼仪</div>
    </div>
  </div>
</template>

<script>
import VueDPlayer from 'vue-dplayer'
import 'vue-dplayer/dist/vue-dplayer.css'
import Vue from 'vue'

Vue.use(VueDPlayer)

export default {
  name: 'Home',
  props: ['videoFile'],
  data() {
    return {
      player: null,
      options: {
        video: {
          url: ''
        },
        contextmenu: [{}]
      },
      input: ''
    }
  },
  mounted() {
    this.player = this.$refs.player.dp
    // console.log('videoinfo----', this.videoinfo)
    // console.log('options----', this.options)
  },
  watch: {
    videoFile: function(newVal, oldVal) {
      // this.options.video.url = 'http://localhost:3000' + newVal.path
      this.setVideoUrl(
        '/smart/storage/download?filePath=' +
          newVal.path.replace(/\\/g, '/')
      )
      // console.log('newVal', newVal)
      // console.log('oldVal', oldVal)
    }
  },
  methods: {
    setVideoUrl(url) {
      this.player.switchVideo({
        url: url
      })
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.inputbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.inputbox-left {
  display: flex;
  flex: 1;
}
.inputbox-center {
  display: flex;
  flex: 2;
}
.inputbox-right {
  display: flex;
  flex: 1;
}
</style>
