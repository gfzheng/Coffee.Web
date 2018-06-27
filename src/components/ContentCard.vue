<template>
  <div class="content-card">
    <span v-if="!contentData.Public" class="lock-text">
      <i v-if="!contentData.Public" class="fa fa-lock fa-fw" aria-hidden="true"></i>
      仅自己可见
    </span>
    <p class="title" @click="gotoDetail">{{contentData.Name}}</p>
    <p class="text-body" v-html="bodyText"></p>
    <p class="see-all" v-if="moreText&&!seeAll" @click="seeAll = true">查看全部</p>
    <p class="see-all" v-if="seeAll" @click="seeAll = false">收起全文</p>
    <image-view v-if="contentData.Album.Images" :contentId="contentData.ID" :images="contentData.Album.Images"/>
    <slot></slot>
    <div class="tag-box">
      <el-tag size="small" class="tag" v-for="(tag, index) in contentData.Tag" :key="index">{{tag}}</el-tag>
    </div>
    <el-row class="control-box">
      <el-button :disabled="buttonLike" size="small" type="success" :plain="!likeData.includes(contentData.ID)" @click="likeIt">
        <i class="fa fa-thumbs-up fa-fw" aria-hidden="true"></i> | {{contentData.LikeNum}}</el-button>
      <el-button size="small" type="warning" @click="toComment">
        <i class="fa fa-commenting-o fa-fw" aria-hidden="true"></i> | {{contentData.CommentNum}}</el-button>
      <el-button v-if="showEdit" size="small" type="primary" icon="el-icon-edit" @click="$emit('showEdit')"></el-button>
    </el-row>
    <el-collapse-transition>
      <comments v-if="showComment" ref="commentsChild" :contentData="contentData" @flushCount="flushCount" :pageSize="5"></comments>
    </el-collapse-transition>
  </div>
</template>

<script>
import ImageView from './Home/Content/Image/ImageView'
import Comments from './Comments/Comments'
import { mapState } from 'vuex'
export default {
  props: {
    contentData: {
      require: true
    },
    showEdit: {
      type: Boolean,
      default: false,
      require: false
    }
  },
  components: {
    Comments,ImageView
  },
  data () {
    return {
      showComment: false,
      moreText: false,
      seeAll: false,
      buttonLike: false
    }
  },
  computed: {
    ...mapState({
      likeData: state => state.user.like,
      logged: s => s.user.logged
    }),
    bodyText () {
      this.checkText()
      let htmlText = this.contentData.Detail.replace(/\n/g, '<br/>').replace(/\ /g, '&nbsp;')
      if (this.seeAll) return htmlText;
      if (this.moreText) {
        return htmlText.substr(0, 200) + '...'
      } else {
        return htmlText
      }
    }
  },
  mounted () {
    this.checkText()
  },
  methods: {
    // 为内容点赞
    async likeIt () {
      this.buttonLike = true
      if (!this.logged) {
        this.$message.error("请先登陆")
        this.$nextTick(_ => {
          this.buttonLike = false
        })
        return
      }
      try {
        if (this.likeData.includes(this.contentData.ID)) {
          let res = await this.$service.like.Delete.call(this, {
            id: this.contentData.ID,
            type: 'content'
          })
          if (res.State === 'success') {
            await this.$service.like.Get.call(this)
            this.contentData.LikeNum--
          } else {
            throw res.State
          }
        } else {
          let res = await this.$service.like.Add.call(this, {
            id: this.contentData.ID,
            type: 'content'
          })
          if (res.State === 'success') {
            await this.$service.like.Get.call(this)
            this.contentData.LikeNum++
          } else {
            throw res.State
          }
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
      this.$nextTick(_ => {
        this.buttonLike = false
      })
    },

    // 更新评论数量
    flushCount (num) {
      this.contentData.CommentNum = num
    },

    checkText () {
      if (this.contentData.Detail.length > 200) {
        this.moreText = true
      } else {
        this.moreText = false
      }
    },

    formatTime (data) {
      return this.$util.formatDate(new Date(data), 'yyyy.M.dd hh:mm')
    },

    toComment () {
      this.showComment = !this.showComment
      if (this.showComment == true) {
        this.$nextTick(_ => {
          this.$refs.commentsChild.initComments()
        })
      }
    },
    doneEdit () {
      this.showEdit = false
      this.$emit('FlushTextList');
    },

    gotoDetail () {
      this.$router.push({ name: 'Detail', params: { id: this.contentData.ID } })
    },

  }
}
</script>


<style lang="scss">
.line-time {
  &:hover {
    .time-point {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .time-point {
    color: white;
    margin-left: -10px;
    border: 2px solid orange;
    border-radius: 100%;
  }
  .time-text {
    margin-left: 20px;
    font-size: 18px;
  }
  padding-top: 10px;
  color: rgb(206, 161, 123);
}

.content-card {
  text-align: left;
  .control-box {
    margin-top: 15px;
    text-align: right;
  }
  .title {
    display: inline-block;
    margin-bottom: 5px;
    user-select: none;
    cursor: pointer;
    margin-top: 5px;
    font-size: 23px;
    transition: all 0.5s;
    &:hover {
      color: rgb(73, 73, 73);
      transform: translateY(-3px);
    }
  }
  .text-body {
    color: rgb(59, 59, 59);
    margin: 20px 20px 20px 20px;
  }
  .see-all {
    display: inline;
    cursor: pointer;
    font-size: 14px;
    color: rgb(45, 45, 151);
    &:hover {
      color: gray;
    }
  }
  .tag-box {
    text-align: right;
    .tag {
      margin-left: 5px;
    }
  }
  .lock-text {
    float: right;
    color: gray;
    font-size: 13px;
  }
}
</style>
