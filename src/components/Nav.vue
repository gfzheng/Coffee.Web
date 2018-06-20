<template>
  <div class="nav-menu">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0" class="head-box">
          <img class="nav-logo" src="../assets/coffee.png">
          <span class="nav-title">Coffee</span>
      </el-menu-item>
      <el-menu-item index="1">
        <i class="fa fa-home fa-fw" aria-hidden="true"></i>
        主页
      </el-menu-item>
      <el-menu-item index="4">
        <i class="fa fa-comments fa-fw" aria-hidden="true"></i>
        广场
      </el-menu-item>
      <el-menu-item class="menu-login" index="2" v-if="!logged">
        <i class="fa fa-user fa-fw" aria-hidden="true"></i>
        登录
      </el-menu-item>
      <el-submenu class="menu-user" index="3" v-if="logged">
        <template slot="title">
          <img class="user-avatar" :src="avatar">
          <el-badge :is-dot="notif">{{name}}</el-badge>
        </template>
        <el-menu-item index="3-1">
          <el-badge :value="notifCount">消息</el-badge>
        </el-menu-item>
        <el-menu-item index="3-1">设置</el-menu-item>
        <el-menu-item index="3-2">退出登陆</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        logged: state => state.user.logged,
        name: state => state.user.name,
        avatar: state => state.user.info.Avatar
      })
    },
    data() {
      return {
        activeIndex: '1',
        notif: true,
        notifCount: 5
      };
    },
    methods: {
      async login() {
        try {
          const res = await this.$service.user.GetVioletURL.call(this, this.$route.name)
          console.log(res)
          window.location.href = res.Data
        } catch (error) {
          this.$service.errorHandle.call(this, error, message => {
            this.$notify.error({
              title: message
            })
          })
        }
      },
      logout() {
        this.$store.commit("logout")
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
        if (key == '2') {
          this.login()
        } else if (key == '3-2') {
          this.logout()
        }
      }
    }
  }
</script>

<style lang="scss">
  $fontColor: #bfcbd9;
  .nav-menu {
    position: fixed;
    z-index: 999;
    right: 0;
    left: 0;
    .head-box{
      user-select: none;
      cursor: pointer;
      pointer-events: none;
      .nav-logo {
        height: 35px;
        width: 35px;
      }
      .nav-title{
        margin-left: 5px;
        font-size: 20px;
        color: rgb(77, 39, 14);
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

</style>
