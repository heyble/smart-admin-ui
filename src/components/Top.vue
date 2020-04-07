<template>
  <div class="top">
    <div class="left">LOGO</div>
    <div class="right">
      <div class="r-left">smart</div>
      <div class="r-right">
        <el-dropdown placement="bottom">
          <span class="el-dropdown-link">
            <el-avatar :size="50" :src="circleUrl"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">退出登录</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-divider direction="vertical" content-position="center"></el-divider>
        <el-badge :value="200" :max="99" class="item">
          <el-button size="small">通知</el-button>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.top {
  height: 100%;
  display: flex;
  position: relative;
  background: #ababab;
}
.left {
  position: absolute;
  width: 200px;
  height: 100%;
  //   background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-align: center;
}
.right {
  margin-left: 200px;
  width: 100%;
  height: 100%;
  //   background: blue;
  overflow: hidden;
}
.r-left {
  float: left;
  width: 100px;
  height: 100%;
  overflow: hidden;
  display: flex;
  margin-left: 10px;
  align-items: center;
  -webkit-box-align: center;
}
.r-right {
  float: right;
  width: 200px;
  height: 100%;
  margin-right: 100px;
  //   background: fuchsia;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.el-divider--vertical {
  display: inline-block;
  width: 1px;
  height: 2em;
  margin: 0 20px;
  vertical-align: middle;
  position: relative;
}
</style>
