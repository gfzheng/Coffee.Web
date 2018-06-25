<template>
  <el-row class="users-comment">
    <div class="user-info">
      <img class="user-avatar" :src="commentData.User.Avatar">
      <div class="comment-name" @click="gotoUser(commentData.Comment.UserID)">
        <div class="name">{{commentData.User.Name}}</div>
        <div class="time">{{formatTime(commentData.Comment.Date)}}</div>
      </div>
    </div>
    <div class="comment-content">{{commentData.Comment.Content}}</div>
    <div class="comment-control">
      <el-button type="text" :class="[!likeData.includes(commentData.Comment.ID) ? 'button-good': 'button-gooded']" @click="likeIt(-1)">
        <i class="fa fa-thumbs-up fa-fw" aria-hidden="true" @click="likeIt"></i> 赞 ({{commentData.Comment.LikeNum}})
      </el-button>
      <el-button type="text" class="button-reply" @click="toReply">
        <i class="fa fa-comments fa-fw" aria-hidden="true"></i> {{replyCount}}
      </el-button>
      <el-button type="text" class="button-reply" @click="deleteComment(0)">
        <i class="fa fa-trash-o fa-fw" aria-hidden="true"></i> 删除
      </el-button>
      <div v-show="showReply" class="comment-reply">
        <div v-for="(reply, index) in commentData.Replies" :key="index">
          <span class="reply-name" @click="gotoUser(reply.Reply.UserID)">{{reply.User.Name}}: </span>
          <span class="reply-father" @click="gotoUser(reply.Reply.FatherID)">@{{reply.Father.Name}} </span>
          <span class="reply-content">{{reply.Reply.Content}} </span>
          <div class="reply-control">
            <span class="reply-time">{{formatTime(reply.Reply.Date)}}</span>
            <el-button type="text" :class="[!likeData.includes(reply.Reply.ID) ? 'button-good': 'button-gooded']" @click="likeIt(index)">
              <i class="fa fa-thumbs-up fa-fw" aria-hidden="true"></i> 赞 ({{reply.Reply.LikeNum}})</el-button>
            <el-button type="text" class="reply-reply" @click="toReplyIt(index)">
              <i class="fa fa-comments-o fa-fw" aria-hidden="true"></i> 回复</el-button>
            <el-button type="text" class="reply-reply" @click="deleteComment(reply.Reply.ID)">
              <i class="fa fa-trash-o fa-fw" aria-hidden="true"></i> 删除
            </el-button>
          </div>
        </div>
        </el-pagination>
        <transition name="el-zoom-in-top" @after-enter="enterReply">
          <div v-show="showReplyInput" class="reply-input-box">
            <el-input v-model="replyText" size="mini" placeholder="回复" ref="replyInput">
              <template slot="prepend">{{fatherName}}</template>
              <el-button slot="append" icon="el-icon-check" @click="addReply"></el-button>
            </el-input>
          </div>
        </transition>
      </div>
    </div>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      likeData: state => state.user.like,
      logged: s => s.user.logged
    })
  },
  props: {
    commentData: {
      required: true
    }
  },
  data () {
    return {
      replyCount: 0,
      fatherId: '',
      fatherName: '回复：',
      replyText: '',
      showReplyInput: false,
      showReply: false,
      replyIndex: 0,
    }
  },
  methods: {
    async likeIt (index) {
      if (!this.logged) {
        this.$message.error("请先登陆")
        return
      }
      let contentId = index === -1 ? this.commentData.Comment.ID : this.commentData.Replies[index].Reply.ID
      let likeType = index === -1 ? 'comment' : 'reply'
      try {
        if (this.likeData.includes(contentId)) {
          let res = await this.$service.like.Delete.call(this, {
            id: contentId,
            type: likeType
          })
          if (res.State === 'success') {
            await this.$service.like.Get.call(this)
            if (index === -1) {
              this.commentData.Comment.LikeNum--
            } else {
              this.commentData.Replies[index].Reply.LikeNum--
            }
          }
        } else {
          let res = await this.$service.like.Add.call(this, {
            id: contentId,
            type: likeType
          })
          if (res.State === 'success') {
            await this.$service.like.Get.call(this)
            if (index === -1) {
              this.commentData.Comment.LikeNum++
            } else {
              this.commentData.Replies[index].Reply.LikeNum++
            }
          } else {
            this.$notify.error('你就算点再快也只是只能赞一次的呀！👍')
          }
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },

    gotoUser (userId) {
      this.$router.push({ name: 'User', params: { id: userId } })
    },

    async addReply () {
      if (!this.logged) {
        this.$message.error("请先登陆")
        return
      }
      try {
        let res = await this.$service.comment.Add.call(this, {
          contentId: this.commentData.Comment.ID,
          fatherId: this.fatherId,
          content: this.replyText,
          isReply: true
        })
        if (res.State !== "success") {
          this.$notify.error({
            title: res.State
          })
        } else {
          this.replyText = ''
          this.$message({
            message: '回复成功',
            type: 'success'
          });
          this.replyCount++
          this.InitReply()
          this.$emit("flushComment")
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },

    deleteComment (id) {
      this.$confirm('你即将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          console.log(id)
          let isReply = (id !== 0)
          if (!isReply) id = this.commentData.Comment.ID
          console.log(id)
          let res = await this.$service.comment.Delete.call(this, id)
          if (res.State !== "success") {
            this.$notify.error({
              title: res.State
            })
          } else {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            if (isReply) this.replyCount--
            this.InitReply()
            this.$emit("flushComment")
          }
        } catch (error) {
          this.$service.errorHandle.call(this, error)
        }
      })
    },

    formatTime (data) {
      return this.$util.formatDate(new Date(data), 'yyyy.M.dd hh:mm')
    },
    InitReply () {
      this.fatherId = ''
      this.fatherName = '回复：'
      this.replyText = '',
        this.showReplyInput = false
    },
    toReply () {
      this.showReply = true
      this.showReplyInput = true
      this.fatherId = this.commentData.Comment.UserID
      this.fatherName = '@' + this.commentData.User.Name
      this.replyText = ' '
      this.$refs.replyInput.focus()
    },
    toReplyIt (index) {
      this.showReplyInput = true
      this.fatherId = this.commentData.Comment.UserID
      this.fatherName = '@' + this.commentData.Replies[index].User.Name
      this.replyText = ' '
      this.replyIndex = index
      this.$refs.replyInput.focus()
    },
    enterReply () {
      this.$refs.replyInput.focus()
    }
  },
  mounted () {
    if (this.commentData.Replies === null) {
      this.commentData.Replies = []
    } else if (this.commentData.Replies.length > 0) {
      this.showReply = true
    }
    this.replyCount = this.commentData.Replies.length
  }
}
</script>


<style lang="scss">
.users-comment {
  margin-top: 20px;
  font-size: 14px;
  .content-box {
    margin-top: 20px;
  }
  .comment-content {
    margin: 10px 20px;
    color: gray;
  }
  .comment-control {
    margin: 0 20px;
    .button-good {
      color: rgb(182, 178, 178);
      &:hover {
        color: #409eff;
      }
    }
    .button-gooded {
      color: #409eff;
      &:hover {
        color: #198cff;
      }
    }
    .button-reply {
      color: rgb(182, 178, 178);
      &:hover {
        color: rgb(121, 113, 113);
      }
    }
    .comment-reply {
      border-left: 2px solid rgb(216, 216, 216);
      padding: 0 15px;
      .reply-input-box {
        margin-top: 15px;
      }
      .reply-name {
        cursor: pointer;
        color: #409eff;
        margin-right: 4px;
      }
      .reply-father {
        cursor: pointer;
        color: #409eff;
      }
      .reply-content {
        color: gray;
      }
      .reply-control {
        margin-top: 0px;
        .reply-time {
          font-size: 11px;
          color: rgb(182, 178, 178);
        }
        .reply-reply {
          margin-left: 10px;
          color: rgb(182, 178, 178);
          &:hover {
            color: rgb(121, 113, 113);
          }
        }
      }
    }
  }
  .user-info {
    cursor: pointer;
    .user-avatar {
      vertical-align: top;
      margin: 10px;
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }
    .comment-name {
      padding-top: 14px;
      display: inline-block;
      .name {
        font-weight: bold;
      }
      .time {
        font-size: 11px;
        color: rgb(180, 175, 175);
      }
    }
  }
}
</style>
