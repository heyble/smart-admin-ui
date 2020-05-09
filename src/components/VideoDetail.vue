<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <div class="left-top">
          <!-- <slot name="videoplay" :videofile="videoinfo.files.pop()"></slot> -->
          <videoPlayer :video-file="videoFile"></videoPlayer>
        </div>
        <div class="left-floor"></div>
      </div>
      <div class="right">
        <div class="right-top">
          <h3>片名：{{videoInfo.name}}</h3>
          <p>选集</p>
          <ul>
            <li>
              <el-button type="primary">1</el-button>
              <!-- {{index}} -->
            </li>
          </ul>
          <p>导演：{{videoInfo.director}}</p>
          <p>导演：{{videoInfo.starring}}</p>
          <p>剧情简介：{{videoInfo.description}}</p>
          </div>
        <div class="right-floor"></div>
      </div>
    </div>
  </div>
</template>

<script>
import videoPlayer from '@/components/VideoPlayer'
export default {
  components: {
    videoPlayer
  },
  props: ['videoInfo'],
  data() {
    return {
      videoFile: {}
    }
  },
  mounted() {
    // console.log('videoInfo', this.videoInfo)
  },
  watch: {
    videoInfo: function(newVal, oldVal) {
      this.videoFile = newVal.files.pop()
      // console.log('newVal', newVal)
      // console.log('oldVal', oldVal)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  display: flex;
}
.container {
  justify-content: center;
}
.main {
  height: 100%;
  width: 80%;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.left {
  flex: 3;
}
.right {
  flex: 1;
}
.right-top {
  flex-direction: column;
  padding-left: 24px;
}
</style>
