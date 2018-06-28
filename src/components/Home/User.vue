<template>
  <div class="home">
    <el-row class="top-banner" :gutter="20" type="flex">
      <el-col class="avatar-box" :offset="1" :span="6">
        <img class="avatar" :src="userData.Info.Avatar">
      </el-col>
      <el-col class="info-box" :span="15">
        <el-button :class="[windowsScroll < 260 ? 'button-back': 'button-float']" type="primary" icon="el-icon-back" circle title="返回" @click="$router.back()"/>
        <p class="info-bio">
          {{userData.Info.Bio}}
        </p>
        <div class="info-name">
          {{userData.Info.Name }}
          <i v-if="userData.Info.Gender === 0" class="fa fa-transgender i-other" aria-hidden="true"></i>
          <i v-if="userData.Info.Gender  === 2" class="fa fa-venus i-pink" aria-hidden="true"></i>
          <i v-if="userData.Info.Gender  === 1" class="fa fa-mars i-blue" aria-hidden="true"></i>
        </div>
        <div class="info-email">
          {{userData.Email}}
        </div>
      </el-col>
    </el-row>
    <el-row class="home-body" :gutter="40" type="flex" justify="center">
      <el-col class="content" :span="20">
        <tab/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tab from './Tab'
export default {
  name: 'Home',
  components: {
    Tab
  },
  data() {
    return {
      userData: {
        Info: {
          Name: '匿名用户',
          Avatar: 'https://pic3.zhimg.com/50/v2-e2361d82ce7465808260f87bed4a32d0_im.jpg',
          Gender: 0,
          Bio: ''
        }
      },
      windowsScroll: 0,
      textData: []
    }
  },
  methods: {
    async getData () {
      try {
        let res = await this.$service.content.Get.call(this, this.$route.params.id)
        if (res.State == 'success') {
          this.textData = res.Data || []
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }
  },
  async mounted () {
    window.addEventListener('scroll',(e) => {
      this.windowsScroll = window.scrollY
    })
    try {
      if (!this.$route.params.id) {
        this.$router.push({ name: 'tab' })
        return
      }
      let res = await this.$service.user.GetInfo.call(this, this.$route.params.id)
      if (res.State === 'success') {
        this.userData = res
      }
      this.getData()
    } catch (error) {
      this.$service.errorHandle.call(this, error)
    }
  }
}
</script>

<style lang="scss">
.home {
  background-image: url("http://xmatrix-1252808268.cosgz.myqcloud.com/wallhaven.jpg");
  background-size: cover;
  background-attachment: fixed;
  .top-banner {
    text-align: left;
    height: 350px;
    padding-top: 280px;
    .avatar-box {
      min-width: 200px;
      text-align: right;
      .avatar {
        box-shadow: 0px -2px 3px rgba($color: #292727, $alpha: 0.2);
        border-radius: 50%;
        height: 140px;
        width: 140px;
        border: 5px solid white;
      }
    }
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
      .info-name {
        padding-top: 5px;
        font-size: 22px;
        font-weight: bold;
        .i-pink {
          color: #e87a90;
        }
        .i-blue {
          color: #2ea9df;
        }
        .i-other {
          color: #1b813e;
        }
      }
      .info-email {
        color: gray;
        margin-top: 6px;
        font-size: 15px;
      }
      .info-bio {
        height: 20px;
        color: white;
        margin-top: 40px;
        font-size: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    z-index: 10;
  }
  .home-body {
    box-shadow: 0px -2px 3px rgba($color: #292727, $alpha: 0.2);
    background-color: rgba(245, 245, 245, 0.95);
    padding-top: 120px;
    min-height: 800px;
    .content {
      max-width: 1100px;
    }
  }
}
</style>
