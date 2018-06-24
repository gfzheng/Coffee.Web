<template>
  <div class="content-text">
    <el-row class="tool-bar" type="flex" justify="space-between">
      <el-col>
        <el-input class="input-search" placeholder="请输入内容" v-model="searchText" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col class="buttons" :span="5">
        <el-button v-if="!newVisible" type="primary" icon="el-icon-plus" circle @click="showNewCard"></el-button>
        <el-button v-if="newVisible" type="danger" icon="el-icon-close" circle @click="closeNewCard"></el-button>
      </el-col>
    </el-row>
    <transition name="el-zoom-in-top">
      <edit-card @submit="getTextContent" v-if="newVisible"></edit-card>
    </transition>
    <content-card @FlushTextList="getTextContent" v-for="(content, index) in contents" :contentData="content" :key="index"></content-card>
    <el-pagination class="pagination" background layout="prev, pager, next" :page-size="15" :total="20" />
  </div>
</template>

<script>
import ContentCard from './ContentCard'
import EditCard from './EditCard'
export default {
  name: 'ContentText',
  computed: {
  },
  components: {
    ContentCard, EditCard
  },
  data () {
    return {
      searchText: '',
      newVisible: false,
      contents: []
    }
  },
  methods: {

    showNewCard () {
      this.newVisible = true;
    },

    closeNewCard () {
      this.newVisible = false;
    },

    async getTextContent () {
      try {
        let res = await this.$service.content.GetText.call(this)
        this.contents = []
        this.closeNewCard()
        this.$nextTick(_ => {
          this.contents = res.Data
        })
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },

    async getLike () {
      try {
        await this.$service.like.Get.call(this)
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }
  },
  mounted () {
    // 获取信息
    this.getTextContent()
    this.getLike()
  }
}
</script>


<style lang="scss">
.content-text {
  margin-left: 50px;
  text-align: left;
  border-left: 3px solid rgb(220, 220, 220);
  .pagination {
    margin: 30px;
  }
  .tool-bar {
    .buttons {
      text-align: right;
    }
    margin: 20px 0 20px 28px;
  }
}
</style>
