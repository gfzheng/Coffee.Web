<template>
  <div class="home">
    <el-row class="top-banner" :gutter="20" type="flex">
      <el-col class="avatar-box" :span="6">
        <img class="avatar" :src="avatar">
      </el-col>
      <el-col class="info-box" :span="15">
        <p class="info-bio">
          {{bio}}
        </p>
        <el-row type="flex">
          <el-col>
        <div class="info-name">
          {{name}}
          <i v-if="gender === 0" class="fa fa-transgender i-other" aria-hidden="true"></i>
          <i v-if="gender === 2" class="fa fa-venus i-pink" aria-hidden="true"></i>
          <i v-if="gender === 1" class="fa fa-mars i-blue" aria-hidden="true"></i>
        </div>
        <div class="info-email">
          {{email}}
        </div>
        </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="home-body" :gutter="40" type="flex" justify="center">
      <el-col class="content" :span="20">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState({
      name: state => state.user.name,
      bio: state => state.user.info.Bio,
      email: state => state.user.email,
      avatar: state => state.user.info.Avatar,
      gender: state => state.user.info.Gender,
    })
  },
  async mounted () {
    try {
      let res = await this.$service.user.GetInfo.call(this)
      if (res.State !== 'success') {
        this.$service.user.Logout.call(this)
      } else {
        this.$store.commit('setInfo', res)
      }
    } catch (error) {
      this.$service.user.Logout.call(this)
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
