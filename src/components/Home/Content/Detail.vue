<template>
  <div class="detail">
    <el-row class="top-banner" :gutter="20" type="flex" justify="center">
      <el-col class="info-box" :span="18">
        <el-button :class="[windowsScroll < 260 ? 'button-back': 'button-float']" type="primary" icon="el-icon-back" circle title="返回" @click="backPage"></el-button>
        <p class="info-title">
          {{detail.title}}
        </p>
        <div class="info-name">
          <img class="user-avatar" :src="own.avatar" />
          <div class="user-info">
            <div class="user-name">{{own.name}}</div>
            <div class="user-time">{{formatDate(detail.time)}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="home-body" :gutter="40" type="flex" justify="center">
      <el-col class="content" :span="18">
        <div class="info-content">
          {{windowsScroll}}
          {{detail.content}}
        </div>
         <comments :comments="detail.comments"></comments>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import comments from './Comments/Comments'
  export default {
    components: {
      comments
    },
    data() {
      return {
        own: {
          id: '12345',
          name: 'ZhenlyChen',
          avatar: 'https://violet-1252808268.cosgz.myqcloud.com/5a423d7b1957c732d450a4ac.jpg',
        },
        windowsScroll: 0,
        detail: {
          id: '123542334',
          title: '我是一个标题',
          content: '我是一个内容',
          time: new Date(),
          likeNum: 122,
          commentNum: 12,
          tags: ['有趣', '日记'],
          isPublic: false,
          comments: [{
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
          ]
        }
      }
    },
    methods: {
      formatDate(date) {
        return this.$util.formatDate(new Date(date), 'yyyy.M.dd hh:mm')
      },
      backPage() {
        this.$router.back()
      }
    },
    mounted()
    {
      window.scrollTo(0,0)
      window.onscroll = _ => {
        this.windowsScroll = window.scrollY
      }
    }
  }
</script>


<style lang="scss">
  .detail {
    background-image: url('../../../assets/wallhaven.jpg');
    background-size: cover;
    background-attachment: fixed;
    .top-banner {
      text-align: left;
      height: 350px;
      padding-top: 270px;
      .info-box {
        .button-back{
          position: absolute;
          left: 30px;
          bottom: -18px;
        }
        .button-float{
          position: fixed;
          left: 20px;
          top: 70px;
        }
        .info-title {
          color: white;
          margin-top: 40px;
          font-size: 25px;
        }
        .info-name {
          .user-avatar {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
          }
          .user-info {
            display: inline-block;
            vertical-align: bottom;
            .user-name {
              font-size: 16px;
            }
            .user-time {
              font-size: 14px;
              color: grey;
            }
          }
        }
      }
      z-index: 10;
    }
    .home-body {
      text-align: left;
      box-shadow: 0px -2px 3px rgba($color: #292727, $alpha: 0.2);
      background-color: rgba(254, 254, 254, 0.95);
      padding-top: 80px;
      min-height: 800px;
      .content {
        max-width: 1100px;
        .info-content {
          padding: 20px 0;
          color: rgb(68, 68, 68);
          margin-top: 6px;
          font-size: 15px;
          min-height: 300px;
        }
      }
    }
  }
</style>
