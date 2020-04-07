<template>
  <div id="app">
    <!-- <el-container>
      <el-header style="height: 100px;padding: 0">
        <top></top>
      </el-header>
      <el-container>
        <el-aside style="width: 200px">
          <slidebar></slidebar>
        </el-aside>
        <el-main>
          <center></center>
        </el-main>
      </el-container>
    </el-container> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
// import slidebar from '@/components/Slidebar'
// import top from '@/components/Top'
// import center from '@/components/Center'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

export default {
  data() {
    return {}
  },
  components: {
    // slidebar,
    // top,
    // center
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
