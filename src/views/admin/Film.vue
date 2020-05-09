<template>
  <div>
    <admintable tableName='film'></admintable>
  </div>
</template>

<script>
import admintable from '@/components/Table'
// import top from '@/components/Top'
// import center from '@/components/Center'
export default {
  components: {
    // slidebar,
    // top,
    admintable
  },
  mounted() {
    console.log('film admin')
  }
}
</script>

<style lang="scss" scoped>
</style>
