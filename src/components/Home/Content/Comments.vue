<template>
  <div class="comments">
    <el-row>
      <el-input v-model="commentText" size="small" class="input-comment" placeholder="来评论一下吧">
        <el-button slot="append" icon="el-icon-check"></el-button>
      </el-input>
    </el-row>
    <comment-part v-for="(comment, index) in comments" :commentData="comment" :key="index" ref="commentPart"></comment-part>
  </div>
</template>

<script>
import CommentPart from './CommentPart'

export default {
  props: {
      comments: {
          required: true
      }
  },
  components: {
    CommentPart
  },
  data() {
    return {
      commentText: ''
    }
  },
  methods: {
    initComments() {
      this.commentText = ''
      for (let i in this.$refs.commentPart) {
        this.$refs.commentPart[i].InitReply()
      }
    }
  }
}
</script>


<style lang="scss">
  .comments {
    margin-top: 10px;
    padding: 10px;
    border-top: 1px solid rgba(0, 0, 0, .1);
    .input-comment {
      margin-top: 10px;
    }
  }
</style>
