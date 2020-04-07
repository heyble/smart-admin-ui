<template>
  <div class="bimg">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.bimg {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  -webkit-box-align: center;
  height: 100%;
  width: 100%;
//   background: url('http://pic1.win4000.com/wallpaper/5/57972f678592a.jpg');
  background-size: 100% 100%;
}
</style>
