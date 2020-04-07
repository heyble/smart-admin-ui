<template>
  <div>
    <el-container>
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
    </el-container>
  </div>
</template>

<script>
import slidebar from '@/components/Slidebar'
import top from '@/components/Top'
import center from '@/components/Center'
export default {
  components: {
    slidebar,
    top,
    center
  }
  // beforeRouteEnter(to, from, next) {
  //   var token = localStorage.getItem('Authenction')
  //   console.log(token == null)
  //   if (token == null) {
  //     next('/login')
  //   }
  // }
}
</script>

<style lang="scss" scoped>
</style>
