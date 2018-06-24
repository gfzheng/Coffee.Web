<template>
  <div class="square">
    <el-row type="flex" :gutter="20" justify="center">
      <el-col :span="16">
        <el-card shadow="hover" class="public-card" v-for="(content, index) in contents" :key="index">
          <div class="info-name">
            <img class="user-avatar" :src="content.User.Avatar" />
            <div class="user-info">
              <div class="user-name">{{content.User.Name}}</div>
            </div>
          </div>
          <content-card class="content-body" :contentData="content.Data" :key="index" />
        </el-card>
      </el-col>
      <!-- <el-col class="square-right" :span="5">
        <el-card class="right-fixed" shadow="hover">
          World
        </el-card>

      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import ContentCard from '../ContentCard'
export default {
  components: {
    ContentCard
  },
  data () {
    return {
      contents: []
    }
  },
  methods: {
    async GetPublic () {
      try {
        let res = await this.$service.content.GetPublic.call(this)
        this.contents = res.Data
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }
  },
  mounted () {
    this.GetPublic()
  }
}
</script>

<style lang="scss">
.square {
  padding-top: 100px;
  background: rgb(245, 245, 245);
  text-align: left;
  .public-card {
    margin-bottom: 30px;
    .info-name {
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
    .content-body{
      margin: 14px;
    }
  }
  .right-fixed {
    min-width: 200px;
    position: fixed;
    right: 30px;
    top: 120px;
  }
}
</style>
