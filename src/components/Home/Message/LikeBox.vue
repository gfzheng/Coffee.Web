<template>
  <div class="like-box">
    <nothing v-if="likeList.length == 0" helpText="再等等，说不定就会有了"></nothing>
    <div v-else>
      <el-card v-for="(like, index) in likeList" :key="index" shadow="hover">

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
        likeList: []
      }
    }
  }
</script>

<style lang="scss">
  .like-box{

  }
</style>
