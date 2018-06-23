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
  components: {
    CommentPart
  },
  data () {
    return {
      comments: [
        {
          userId: '12345',
          userName: 'ZhenlyChen',
          content: 'Hello, world',
          likeNum: 33,
          avatar: 'https://violet-1252808268.cosgz.myqcloud.com/5a423d7b1957c732d450a4ac.jpg',
          time: new Date(),
          reply: []
        },
        {
          userId: '12345',
          userName: 'ZhenlyChen',
          content: 'Hello, world',
          likeNum: 33,
          avatar: 'https://violet-1252808268.cosgz.myqcloud.com/5a423d7b1957c732d450a4ac.jpg',
          time: new Date(),
          reply: [{
            userId: '4567',
            userName: 'MegaShow',
            fatherId: '12345',
            fatherName: 'ZhenlyChen',
            content: 'No bb',
            time: new Date()
          }, {
            userId: '12345',
            userName: 'ZhenlyChen',
            fatherId: '4567',
            fatherName: 'MegaShow',
            content: 'I bb',
            time: new Date()
          }]
        }
      ],
      commentText: ''
    }
  },
  methods: {
    initComments () {
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
  text-align: left;
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  .input-comment {
    margin-top: 10px;
  }
}
</style>
