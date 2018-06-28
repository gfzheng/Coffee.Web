<template>
  <div class="nav-menu">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0" class="head-box">
        <img class="nav-logo" src="../assets/coffee.png">
        <span class="nav-title">Coffee</span>
      </el-menu-item>
      <el-menu-item index="Home">
        <i class="fa fa-home fa-fw" aria-hidden="true"></i>
        主页
      </el-menu-item>
      <el-menu-item index="Square">
        <i class="fa fa-comments fa-fw" aria-hidden="true"></i>
        广场
      </el-menu-item>
      <el-menu-item index="About">
        <i class="fa fa-info fa-fw" aria-hidden="true"></i>
        关于
      </el-menu-item>
      <el-menu-item class="menu-login" index="Login" v-if="!logged">
        <i class="fa fa-user fa-fw" aria-hidden="true"></i>
        登录
      </el-menu-item>
      <el-submenu class="menu-user" index="3" v-if="logged">
        <template slot="title">
          <img class="user-avatar" :src="avatar">
          <el-badge :is-dot="notif" v-if="all > 0">{{name}}</el-badge>
          <span v-else>{{name}}</span>
        </template>
        <div class="item-space" index="Space">
          <p class="space-name">
            <span class="span-name">{{name}}</span>
            <el-tag size="small">{{userClass}}</el-tag>
          </p>
          <p class="space-title">空间：{{textUsedSize}} / {{textMaxSize}}</p>
          <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="spacePercentage" color="#8e71c7"></el-progress>
        </div>
        <el-menu-item index="Message">
          我的消息
          <el-badge class="message-dot" v-if="all > 0" :value="all" :max="99"></el-badge>
        </el-menu-item>
        <el-menu-item index="Follow">关注列表</el-menu-item>
        <el-menu-item index="Setting">个人设置</el-menu-item>
        <el-menu-item index="Logout">退出登陆</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      class: state => state.user.class,
      logged: state => state.user.logged,
      name: state => state.user.name,
      avatar: state => state.user.info.Avatar,
      class: state => state.user.class,
      maxSize: state => state.user.maxSize,
      usedSize: state => state.user.usedSize,
      all: s => s.message.unread.all
    }),
    textUsedSize () {
      return this.fixSizeNum(this.usedSize)
    },
    textMaxSize () {
      return this.fixSizeNum(this.maxSize)
    },
    spacePercentage () {
      if (this.maxSize === 0) return 0
      return parseFloat((this.usedSize / this.maxSize).toFixed(2)) * 100
    },
    routeName () {
      return this.$route.name
    },
    userClass () {
      let textClass = '普通用户'
      switch (this.class) {
        case -2:
          textClass = '黑名单'
          break
        case -1:
          textClass = '受限'
          break
        case 0:
          textClass = '未认证'
          break
        case 1:
          textClass = '已认证'
          break
        case 10:
          textClass = 'VIP'
          break
        case 50:
          textClass = '管理员'
          break
        case 99:
          textClass = '超级管理员'
          break
        default:
          textClass = '未知'
      }
      return textClass
    }
  },
  data () {
    return {
      activeIndex: 'Home',
      notif: true,
      notifCount: 5,
      textSize: ['B', 'KB', 'MB', 'GB', 'TB']
    };
  },
  mounted () {
    if (this.$route.path.toLowerCase() === '/' || this.$route.path.toLowerCase() === '') {
      this.activeIndex = 'Square'
    } else if (this.$route.path.toLowerCase() === '/home/') {
      this.activeIndex = 'Home'
    } else if (this.$route.path.toLowerCase().substr(0, 7) === '/message') {
      this.activeIndex = 'Message'
    } else if (this.$route.path.toLowerCase() === '/setting') {
      this.activeIndex = 'Setting'
    } else if (this.$route.path.toLowerCase() === '/about') {
      this.activeIndex = 'Setting'
    } else {
      this.activeIndex = 'Nothing'
    }
  },
  watch: {
    '$route' (to, from) {
      switch (to.name) {
        case 'Square':
          this.activeIndex = 'Square'
          break
        case 'Home':
        case 'Tab':
          this.activeIndex = 'Home'
          break
        case 'Setting':
          this.activeIndex = 'Setting'
          break
        case 'Message':
          this.activeIndex = 'Message'
          break
        case 'About':
          this.activeIndex = 'About'
          break
        default:
          this.activeIndex = 'Nothing'
      }
    }
  },
  methods: {
    fixSizeNum (num) {
      let typeSize = 0
      let size = num
      while (size > 1024) {
        size /= 1024
        typeSize++
      }
      return size.toFixed(1) + this.textSize[typeSize]
    },
    upClass () {

    },
    async login () {
      try {
        const res = await this.$service.user.GetVioletURL.call(this, this.$route.name)
        window.location.href = res.Data
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          this.$notify.error({
            title: message
          })
        })
      }
    },
    logout () {
      this.$service.user.Logout.call(this)
    },
    handleSelect (key, keyPath) {
      if (key == 'Login') {
        this.login()
      } else if (key == 'Logout') {
        this.logout()
      } else if (key == 'Square') {
        this.$router.push({ name: "Square" })
      } else if (key == 'Home') {
        if (this.logged) {
          this.$router.push({ name: "Tab" })
        } else {
          this.$router.push({ name: "NotLogin" })
        }
      } else if (key == 'Message') {
        this.$router.push({ name: "CommentBox" })
      } else if (key == 'Setting') {
        this.$router.push({ name: "Setting" })
      } else if (key == 'About') {
        this.$router.push({ name: "About" })
      } else if (key == 'Follow') {
        this.$message("即将推出")
      }
    }
  }
}
</script>

<style lang="scss">
$fontColor: #bfcbd9;
.nav-menu {
  min-width: 500px;
  position: fixed;
  z-index: 999;
  right: 0;
  left: 0;
  .head-box {
    user-select: none;
    cursor: pointer;
    pointer-events: none;
    .nav-logo {
      height: 35px;
      width: 35px;
    }
    .nav-title {
      margin-left: 5px;
      font-size: 20px;
      color: #d2b589;
    }
  }
  .menu-login {
    position: absolute;
    right: 0px;
  }
  .menu-user {
    position: absolute;
    right: 0px;
    .user-avatar {
      border-radius: 50%;
      height: 35px;
      width: 35px;
      margin-right: 10px;
    }
    .is-dot {
      top: 30%;
    }
  }
}
.item-space {
  border-bottom: 1px solid rgba(#ddd, 0.5);
  margin: 3px;
  padding: 10px;
  user-select: none;
  p {
    margin-left: 0;
    margin-bottom: 8px;
    margin: 5px;
    color: gray;
    font-size: 14px;
  }
  .space-title {
    text-align: left;
  }
  .space-name {
    .span-name {
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 15px;
      margin-bottom: 15px;
      margin-right: 10px;
      font-weight: bold;
    }
  }
  .progress {
    margin: 5px;
  }
}
.message-dot {
  margin-top: -10px;
  margin-left: 5px;
}
</style>
