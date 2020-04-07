<template>
  <div>
    <el-container>
      <el-header style="height: 100px;padding: 0">
        <top></top>
      </el-header>

      <el-main class="main">
        <background>
          <logincard></logincard>
        </background>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import top from '@/components/Top'
import background from '@/components/Background'
import logincard from '@/components/LoginCard'
export default {
  components: {
    top,
    background,
    logincard
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 900px;
  padding: 0;
}
</style>
