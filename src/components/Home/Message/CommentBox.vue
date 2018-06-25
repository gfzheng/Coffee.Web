<template>
  <div class="comment-box">
    <nothing v-if="commentList.length == 0" helpText="你还没有收到评论呢"></nothing>
    <div v-else>
      <el-card class="comment-card" v-for="(comment, index) in commentList" :key="index" shadow="hover">
        <el-button class="button-delete" type="text" @click="deleteIt(index)"><i class="fa fa-times" aria-hidden="true"></i></el-button>
        你收到了来自
        <div class="info-name">
          <img class="user-avatar" :src="comment.User.Avatar" />
          <div class="user-info">
            <div class="user-name">{{comment.User.Name}}</div>
          </div>
        </div>
        的评论:
        <span class="comment-content"> {{comment.Data.Content}}</span>
        <el-badge class="badge-new" v-if="!comment.Data.Read" value="new"/>
        <div class="control-box">
          <el-button size="small" @click="gotoDetail(comment.Data.TargetID)">查看详情</el-button>
          <el-button size="small" @click="readIt(index)">{{comment.Data.Read ? '标记为未读' : '标记为已读' }}</el-button>
          <span class="user-time">{{formatTime(comment.Data.CreateTime)}}</span>
        </div>
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

    gotoDetail (contentId) {
      this.$router.push({ name: 'Detail', params: { id: contentId } })
    },

    async readIt (i) {
      try {
        let res = await this.$service.notification.Read.call(this, {
          id: this.commentList[i].Data.ID,
          isRead: !this.commentList[i].Data.Read
        })
        if (res.State === 'success') {
          await this.$service.notification.Get.call(this)
        } else {
          throw res.State
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },

    async deleteIt (i) {
      try {
        let res = await this.$service.notification.Delete.call(this, this.commentList[i].Data.ID)
        if (res.State === 'success') {
          await this.$service.notification.Get.call(this)
        } else {
          throw res.State
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }
  }
}
</script>


<style lang="scss">
.comment-box {
 .comment-card{
   .button-delete{
     margin-top: -25px;
     margin-right: -15px;
     float: right;
   }
   margin-bottom: 20px;
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
  .comment-content {
    margin-left: 20px;
    color: gray;
  }
  .badge-new{
    margin-top: -10px;
    float: right;
  }
  .control-box{
    margin-top: 30px;
    .user-time {
      margin-top: 10px;
      float: right;
      text-align: right;
      font-size: 14px;
      color: grey;
    }
  }
}
}
</style>
