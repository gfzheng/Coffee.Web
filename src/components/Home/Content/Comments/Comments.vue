<template>
  <div class="comments">
    <el-row>
      <el-input v-model="commentText" size="small" class="input-comment" placeholder="来评论一下吧">
        <el-button slot="append" icon="el-icon-check" @click="addComment"></el-button>
      </el-input>
    </el-row>
    <comment-part v-for="(comment, index) in comments" :commentData="comment" :key="index" ref="commentPart" @flushComment="getComment"></comment-part>
  </div>
</template>

<script>
import CommentPart from './CommentPart'

export default {
  props: {
    contentData: {
      require: true
    }
  },
  components: {
    CommentPart
  },
  data () {
    return {
      comments: [],
      commentText: ''
    }
  },
  methods: {
    initComments () {
      this.commentText = ''
      for (let i in this.$refs.commentPart) {
        this.$refs.commentPart[i].InitReply()
      }
    },

    async getComment () {
      try {
        let res = await this.$service.comment.Get.call(this, {
          contentId: this.contentData.ID,
          page: 1,
          eachPage: 10
        })
        if (res.State !== "success") {
          this.$notify.error({
            title: res.State
          })
        } else {
          this.comments = []
            if (res.Data !== null) {
            this.$emit("flushCount", res.Data.length)
            this.$nextTick(_ => {
              this.comments = res.Data
            })
          }
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },

    async addComment () {
      try {
        let res = await this.$service.comment.Add.call(this, {
          contentId: this.contentData.ID,
          fatherId: this.contentData.OwnID,
          content: this.commentText,
          isReply: false
        })
        if (res.State !== "success") {
          this.$notify.error({
            title: res.State
          })
        } else {
          this.commentText = ''
          this.$message({
            message: '评论成功',
            type: 'success'
          });
          this.getComment()
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }

  },
  mounted () {
    this.getComment()
  }
}
</script>


<style lang="scss">
.comments {
  text-align: left;
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  .input-comment {
    margin-top: 10px;
  }
}
</style>
