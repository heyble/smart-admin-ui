<template>
  <div>
    <el-tabs tab-position="left" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
      <el-tab-pane label="个人中心">
          <slot name="personalCenter"></slot>
      </el-tab-pane>
      <el-tab-pane label="角色管理">
          <slot name="roleManagement"></slot>
      </el-tab-pane>
      <el-tab-pane label="设置">
          <slot name="setting"></slot>
      </el-tab-pane>
      <!-- <el-tab-pane label="定时任务补偿">
          <slot name="four"></slot>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
</style>
