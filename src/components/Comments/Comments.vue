<template>
  <div class="comments">
    <el-row>
      <el-input v-model="commentText" size="small" class="input-comment" placeholder="来评论一下吧">
        <el-button slot="append" icon="el-icon-check" @click="addComment"></el-button>
      </el-input>
    </el-row>
    <comment-part v-for="(comment, index) in showComments" :commentData="comment" :key="index" ref="commentPart" @flushComment="getComment"></comment-part>
    <el-pagination v-show="comments.length > pageSize" class="page-change" layout="prev, pager, next" :page-size="pageSize" :total="comments.length" @current-change="changePage"/>
  </div>
</template>

<script>
import CommentPart from './CommentPart'
import { mapState } from 'vuex';

export default {
  props: {
    contentData: {
      require: true
    },
    pageSize: {
      require: true
    }
  },
  components: {
    CommentPart
  },
  data () {
    return {
      comments: [],
      commentText: '',
      currentPage: 1
    }
  },
  computed: {
    showComments() {
      if ((this.currentPage - 1) * this.pageSize > this.comments.length) this.currentPage--
      return this.comments.slice((this.currentPage - 1) * this.pageSize,this.currentPage * this.pageSize)
    },
    ...mapState({
      logged: s => s.user.logged
    })
  },
  methods: {
    changePage(page) {
      this.currentPage = page
    },

    initComments () {
      this.commentText = ''
      for (let i in this.$refs.commentPart) {
        this.$refs.commentPart[i].InitReply()
      }
    },

    async getComment () {
      try {
        let res = await this.$service.comment.Get.call(this, {
          contentId: this.contentData.ID
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
      if (!this.logged) {
        this.$message.error("请先登陆")
        return
      }
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
          await this.getComment()
          this.currentPage = 1
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
  .page-change{
    text-align: center;
    .btn-prev, .number , .btn-next{
      background: transparent;
    }
  }
}
</style>
