<template>
  <div class="message-box">
    <nothing v-if="messageList.length == 0" helpText="你还没有收到私信哦"></nothing>
    <div v-else>
      <el-card v-for="(message, index) in messageList" :key="index" shadow="hover">

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
        messageList: []
      }
    }
  }
</script>

<style lang="scss">
  .message-box{

  }
</style>
