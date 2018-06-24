<template>
  <div class="comment-box">
    <nothing v-if="commentList.length == 0" helpText="你还没有收到评论呢"></nothing>
    <div v-else>
      <el-card v-for="(comment, index) in commentList" :key="index" shadow="hover">

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
        commentList: []
      }
    }
  }
</script>


<style lang="scss">
  .comment-box {
  }
</style>
