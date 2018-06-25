<template>
  <div class="detail">
    <el-row class="top-banner" :gutter="20" type="flex" justify="center">
      <el-col class="info-box" :span="18">
        <el-button :class="[windowsScroll < 260 ? 'button-back': 'button-float']" type="primary" icon="el-icon-back" circle title="返回" @click="backPage"></el-button>
        <p class="info-title">
          {{detail.Name}}
        </p>
        <div class="info-name">
          <img class="user-avatar" :src="own.Avatar" />
          <div class="user-info">
            <div class="user-name">{{own.Name}}</div>
            <div class="user-time">{{formatDate(detail.PublishDate)}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="home-body" :gutter="40" type="flex" justify="center">
      <el-col class="content" :span="18">
        <div class="info-content" v-html="htmlText" />
        <div class="control">
          <el-button @click="likeIt" :disabled="buttonLike" class="button-like" type="success" round :plain="!likeData.includes(detail.ID)">给你个赞 | {{detail.LikeNum}}</el-button>
        </div>
        <div class="tag-box">
          <el-tag class="tag" v-for="(tag, index) in detail.Tag" :key="index">{{tag}}</el-tag>
        </div>
        <comments v-if="loaded" :contentData="detail" @flushCount="flushCount" :pageSize="10"></comments>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import comments from '@/components/Comments/Comments'
import {mapState} from 'vuex'
export default {
  components: {
    comments
  },
  computed: {
    ...mapState({
      likeData: state => state.user.like,
      logged: s => s.user.logged
    }),
    htmlText () {
      return this.detail.Detail.replace(/\n/g, '<br/>').replace(/\ /g, '&nbsp;')
    }
  },
  data () {
    return {
      loaded: false,
      own: {
        Name: '匿名用户',
        Avatar: 'https://pic3.zhimg.com/50/v2-e2361d82ce7465808260f87bed4a32d0_im.jpg'
      },
      windowsScroll: 0,
      detail: {
        Name: 'Coffee',
        Detail: '',
        PublishDate: new Date()
      },
      buttonLike: false
    }
  },
  methods: {
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
        if (this.likeData.includes(this.detail.ID)) {
          let res = await this.$service.like.Delete.call(this, {
            id: this.detail.ID,
            type: 'content'
          })
          if (res.State === 'success') {
            await this.$service.like.Get.call(this)
            this.detail.LikeNum--
          } else {
            throw res.State
          }
        } else {
          let res = await this.$service.like.Add.call(this, {
            id: this.detail.ID,
            type: 'content'
          })
          if (res.State === 'success') {
            await this.$service.like.Get.call(this)
            this.detail.LikeNum++
          } else {
            throw res.State
          }
        }
      } catch(error) {
        this.$service.errorHandle.call(this, error)
      }
      this.buttonLike = false
    },

    flushCount (num) {

    },
    formatDate (date) {
      return this.$util.formatDate(new Date(date), 'yyyy.M.dd hh:mm')
    },
    backPage () {
      this.$router.back()
    },
    async getData () {
      try {
        let res = await this.$service.content.Get.call(this, this.$route.params.id)
        if (res.State == 'success') {
          this.own = res.User
          this.detail = res.Data
          this.loaded = true
        } else {
          this.$notify.error("你没有权限访问此内容")
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    window.onscroll = _ => {
      this.windowsScroll = window.scrollY
    }
    this.getData()
  }
}
</script>


<style lang="scss">
.detail {
  background-image: url("../../../assets/wallhaven.jpg");
  background-size: cover;
  background-attachment: fixed;
  .top-banner {
    text-align: left;
    height: 350px;
    padding-top: 270px;
    .info-box {
      .button-back {
        position: absolute;
        left: 30px;
        bottom: -18px;
      }
      .button-float {
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
        font-size: 16px;
        min-height: 300px;
        margin-bottom: 100px;
      }
      .control {
        text-align: center;
      }
      .tag-box {
        text-align: right;
      }
    }
  }
}
</style>
