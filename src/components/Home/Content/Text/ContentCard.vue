<template>
  <div class="content-card">
    <transition name="el-zoom-in-center" @after-leave="leaveCard">
      <div v-if="showCard">
        <p class="line-time">
          <i class="fa fa-circle time-point" aria-hidden="true"></i>
          <span class="time-text">{{formatTime(contentData.time)}}</span>
        </p>
        <el-card class="text-box" shadow="hover">
          <span v-if="!contentData.isPublic" class="lock-text">
            <i v-if="!contentData.isPublic" class="fa fa-lock fa-fw" aria-hidden="true"></i>
            仅自己可见
          </span>
          <p class="title" @click="gotoDetail">{{contentData.title}}</p>
          <p class="text-body" v-html="bodyText"></p>
          <p class="see-all" v-if="moreText&&!seeAll" @click="toSeeAll">查看全部</p>
          <p class="see-all" v-if="seeAll" @click="toSeeLess">收起全文</p>
          <div class="tag-box">
            <el-tag size="small" class="tag" v-for="(tag, index) in contentData.tags" :key="index">{{tag}}</el-tag>
          </div>
          <el-row class="control-box">
            <el-button size="small" type="success" :plain="true"><i class="fa fa-thumbs-up fa-fw" aria-hidden="true"></i> | {{contentData.likeNum}}</el-button>
            <el-button size="small" type="warning" @click="toComment"><i class="fa fa-commenting-o fa-fw" aria-hidden="true"></i> | {{contentData.comments.length}}</el-button>
            <el-button v-if="showEditButton" size="small" type="primary" icon="el-icon-edit" @click="toEdit"></el-button>
          </el-row>
          <el-collapse-transition>
           <comments v-show="showComment" :comments="contentData.comments" ref="comments"></comments>
          </el-collapse-transition>
        </el-card>
      </div>
    </transition>
    <transition name="el-zoom-in-center" @after-leave="leaveEdit">
      <edit-card v-if="showEdit" @submit="doneEdit" :rawData="contentData"></edit-card>
    </transition>
  </div>
</template>

<script>
  import EditCard from './EditCard'
  import Comments from '../Comments/Comments'
  export default {
    props: {
      contentData: {
        require: true,
      }
    },
    components: {
      EditCard, Comments
    },
    data() {
      return {
        showEditButton: true,
        showCard: true,
        showEdit: false,
        showComment: false,
        moreText: false,
        seeAll: false
      }
    },
    computed: {
      bodyText() {
        let htmlText = this.contentData.content.replace(/\n/g, '<br/>').replace(/\ /g, '&nbsp;')
        if (this.seeAll) return htmlText;
        if (this.moreText) {
          return htmlText.substr(0, 200) + '...'
        } else {
          return htmlText
        }
      }
    },
    mounted() {
        if (this.contentData.content.length > 200) {
          this.moreText = true
        } else {
          this.moreText = false
        }
    },
    methods: {
      formatTime(data) {
        return this.$util.formatDate(new Date(data), 'yyyy.M.dd hh:mm')
      },
      leaveCard() {
        this.showEdit = true
      },
      leaveEdit() {
        this.showCard = true
      },
      toEdit() {
        this.showCard = false
      },
      toComment() {
        this.showComment = !this.showComment
        this.$refs.comments.initComments()
      },
      doneEdit() {
        this.showEdit = false
      },
      gotoDetail() {
        this.$router.push({name: 'Detail'})
      },
      toSeeAll() {
        this.seeAll = true
      },
      toSeeLess() {
        this.seeAll = false
      }
    }
  }
</script>


<style lang="scss">
  .line-time {
    &:hover {
      .time-point {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
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
    .text-box {
      margin-left: 30px;

      .control-box {
        margin-top: 15px;
        ;
        text-align: right;
      }
      .title {
        display: inline-block;
        margin-bottom: 5px;
        user-select: none;
        cursor: pointer;
        margin-top: 5px;
        font-size: 23px;
        transition: all .5s;
        &:hover{
          color:rgb(73, 73, 73);
          transform: translateY(-3px);
        }
      }
      .text-body {
        color:rgb(59, 59, 59);
        margin: 20px 20px 20px 20px;
      }
      .see-all{
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
        .tag{
          margin-left: 5px;
        }
      }
      .lock-text {
        float: right;
        color: gray;
        font-size: 13px;
      }
    }
  }
</style>
