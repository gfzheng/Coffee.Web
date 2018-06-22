<template>
  <div class="system-box">
    <nothing v-if="systemList.length == 0" helpText="系统还没有给你发信息"></nothing>
    <div v-else>
      <el-card v-for="(system, index) in systemList" :key="index" shadow="hover">

      </el-card>
    </div>
  </div>
</template>

<script>
import Nothing from './Nothing'
  export default {
    components: {
      Nothing,
    },
    data() {
      return {
        systemList: []
      }
    }
  }
</script>

<style lang="scss">
  .system-box{

  }
</style>
