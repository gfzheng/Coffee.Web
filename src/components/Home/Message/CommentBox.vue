<template>
  <div class="comment-box">
    <nothing v-if="commentList.length == 0" helpText="你还没有收到评论呢"></nothing>
    <div v-else>
      <el-card v-for="(comment, index) in commentList" :key="index" shadow="hover">
        你收到了来自
        <div class="info-name">
          <img class="user-avatar" :src="comment.User.Avatar" />
          <div class="user-info">
            <div class="user-name">{{comment.User.Name}}</div>
          </div>
        </div>
        的评论
        <el-button size="small" v-if="!comment.Data.Read">查看详情</el-button>
        <el-button size="small" v-if="!comment.Data.Read">标记为已读</el-button>
        <div class="user-time">{{formatTime(comment.Data.CreateTime)}}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Nothing from './Nothing'
import { mapState } from 'vuex'
export default {
  components: {
    Nothing,
  },
  computed: {
    ...mapState({
      commentList: s => s.message.reply
    })
  },
  data () {
    return {
    }
  },
  methods: {

    formatTime (date) {
      return this.$util.formatDate(new Date(date), 'yyyy.M.dd hh:mm')
    },
  }
}
</script>


<style lang="scss">
.comment-box {
  .info-name {
    display: inline-block;
    margin: 0 10px;
    .user-avatar {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
    .user-info {
      display: inline-block;
      vertical-align: middle;
      .user-name {
        font-size: 16px;
      }
    }
  }
  .user-time {
    text-align: right;
    font-size: 14px;
    color: grey;
  }
}
</style>
