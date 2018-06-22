<template>
    <el-row class="users-comment">
      <div>
        <img class="user-avatar" src="../../../assets/avatar.png">
        <div class="comment-name">
          <div class="name">{{commentData.userName}}</div>
          <div class="time">{{formatTime(commentData.time)}}</div>
        </div>
      </div>
      <div class="comment-content">{{commentData.content}}</div>
      <div class="comment-control">
        <el-button type="text" class="button-good"><i class="fa fa-thumbs-up fa-fw" aria-hidden="true"></i> 赞 ({{commentData.likeNum}})</el-button>
        <el-button type="text" class="button-reply" @click="toReply"><i class="fa fa-comments fa-fw" aria-hidden="true"></i> {{commentData.reply.length}}</el-button>
        <div v-show="showReply" class="comment-reply">
          <div v-for="(reply, index) in commentData.reply" :key="index">
            <span class="reply-name">{{reply.userName}}: </span>
            <span class="reply-father">@{{reply.fatherName}} </span>
            <span class="reply-content">{{reply.content}} </span>
            <div class="reply-control">
              <span class="reply-time">{{formatTime(reply.time)}}</span>
              <el-button  type="text" class="reply-reply" @click="toReplyIt(index)"><i class="fa fa-comments-o fa-fw" aria-hidden="true"></i> 回复</el-button>
            </div>
          </div>
          <transition name="el-zoom-in-top" @after-enter="enterReply">
            <div v-show="showReplyInput" class="reply-input-box">
              <el-input v-model="replyText" size="mini" placeholder="回复" ref="replyInput">
                <el-button slot="append" icon="el-icon-check"></el-button>
              </el-input>
            </div>
          </transition>
        </div>
      </div>
    </el-row>
</template>

<script>
export default {
   props: {
        commentData: {
            required: true
        }
    },
    data() {
      return {
        replyText: '',
        showReplyInput: false,
        showReply: false,
        replyIndex: 0,
      }
    },
    methods: {
      formatTime(data) {
        return this.$util.formatDate(new Date(data), 'yyyy.M.dd hh:mm')
      },
      InitReply() {
        this.replyText = '',
        this.showReplyInput = false
      },
      toReply() {
        this.showReply = true
        this.showReplyInput = true
        this.replyText = '@' + this.commentData.userName + ' '
        this.$refs.replyInput.focus()
      },
      toReplyIt(index) {
        this.showReplyInput = true
        this.replyText = '@' + this.commentData.reply[index].userName + ' '
        this.replyIndex = index
        this.$refs.replyInput.focus()
      },
      enterReply() {
        this.$refs.replyInput.focus()
      }
    },
    mounted() {
      console.log(this.commentData.reply.length)
      if (this.commentData.reply.length > 0) this.showReply = true
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
          .comment-content {
            margin: 10px 20px;
            color: gray;
          }
          .comment-control {
            margin: 0 20px;
            .button-good {
              color: rgb(182, 178, 178);
              &:hover {
                color: #409EFF;
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
                color: #409EFF;
                margin-right: 4px;
              }
              .reply-father {
                color: #409EFF;
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
          .user-avatar {
            vertical-align: top;
            margin: 10px;
            height: 35px;
            width: 35px;
            border-radius: 50%;
          }
        }
</style>
