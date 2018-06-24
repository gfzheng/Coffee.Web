<template>
  <div class="square">
    <el-row type="flex" :gutter="20" justify="center">
      <el-col :span="16">
        <content-card class="public-card" v-for="(content, index) in contents" :contentData="content.Data" :key="index" closeTimeLine/>
      </el-col>
      <el-col class="square-right" :span="5">
        <el-card class="right-fixed" shadow="hover">
          World
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import ContentCard from '../ContentCard'
export default {
  components: {
    ContentCard
  },
  data() {
    return {
      contents: []
    }
  },
  methods: {
    async GetPublic() {
      try {
        let res = await this.$service.content.GetPublic.call(this)
        this.contents = res.Data
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }
  },
  mounted() {
    this.GetPublic()
  }
}
</script>

<style lang="scss">
  .square{
    padding-top: 100px;
    background: rgb(245, 245, 245);
    .public-card{
      margin: 20px;
    }
  .right-fixed{
    position: fixed;
    right: 100px;
    top: 120px;
  }
  }
</style>
