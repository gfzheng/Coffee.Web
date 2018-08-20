<template>
  <el-card shadow="hover" class="public-card">
    <div class="info-name">
      <img class="user-avatar" :src="contentData.User.Avatar" />
      <div class="user-info">
        <div class="user-name">
          <a @click="gotoUser(contentData.Data.OwnID)">{{contentData.User.Name}}</a>
        </div>
      </div>
      <user-card class="user-card"/>
    </div>
    <content-card class="content-body" :contentData="contentData.Data"/>
  </el-card>
</template>

<script>
import UserCard from '../components/UserCard'
import ContentCard from '../components/ContentCard'
export default {
  props: {
    contentData: {
      require: true
    }
  },
  components: {
    ContentCard,UserCard
  },
  methods: {
    gotoUser (userId) {
      this.$router.push({ name: 'User', params: { id: userId } })
    },
  }
}
</script>

<style lang="scss">
  .public-card {
    margin-bottom: 30px;
    .info-name {
      .user-card {
        display: none;
      }
      &:hover {
        .user-card {
          display: inherit;
        }
      }
      display: inline-block;
      cursor: pointer;
      margin-bottom: 10px;
      .user-avatar {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
      }
      .user-info {
        display: inline-block;
        vertical-align: middle;
        .user-name {
          font-size: 16px;
        }
        .user-time {
          font-size: 14px;
          color: grey;
        }
      }
    }
    .content-body {
      margin: 14px;
    }
  }
</style>
