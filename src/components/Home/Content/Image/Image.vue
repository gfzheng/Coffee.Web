<template>
  <div class="content-image">
    <el-row v-if="!$route.params.id" class="tool-bar" type="flex" justify="space-between">
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
      <div v-if="newVisible">
        <time-line :titleText="nowTime"></time-line>
        <edit-card @submit="getAlbumContent"></edit-card>
      </div>
    </transition>
    <image-card @FlushTextList="getAlbumContent" v-for="(content, index) in showImage" :contentData="content" :key="index"></image-card>
    <el-pagination class="pagination" v-show="contents.length > pageSize" :current-page="currentPage" background layout="prev, pager, next" :page-size="pageSize" :total="contents.length" @current-change="changePage" />
    <p class="bottom-under line-time">
      <i class="fa fa-circle time-point" aria-hidden="true"></i>
      <span class="time-text">没有了呀...😄</span>
    </p>
  </div>
</template>

<script>
import ImageCard from './ImageCard'
import EditCard from './EditCard'
import TimeLine from '@/components/TimeLine'
export default {
  name: 'ContentText',
  computed: {
    showImage () {
      if ((this.currentPage - 1) * this.pageSize > this.contents.length) this.currentPage--
      return this.contents.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  components: {
    ImageCard, EditCard, TimeLine
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 7,
      searchText: '',
      newVisible: false,
      contents: [],
      nowTime: new Date()
    }
  },
  methods: {

    formatTime (date) {
      return this.$util.formatDate(new Date(date), 'yyyy.M.dd hh:mm')
    },

    changePage (val) {
      this.currentPage = val
    },

    showNewCard () {
      this.newVisible = true;
    },

    closeNewCard () {
      this.newVisible = false;
    },

    async getAlbumContent () {
      try {
        let res = await this.$service.content.GetAlbum.call(this, this.$route.params.id || '')
        this.contents = []
        this.closeNewCard()
        if (res.Data !== null) {
          this.$nextTick(_ => {
            this.contents = res.Data
          })

        }
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
    console.log(this.$route.params.id)
    // 获取信息
    this.getAlbumContent()
    this.getLike()
    this.nowTime = this.formatTime(new Date())
    setInterval(_ => {
      this.nowTime = this.formatTime(new Date())
    }, 30000)
  }
}
</script>


<style lang="scss">
.content-image {
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
  .bottom-under {
    padding-top: 100px;
    padding-bottom: 50px;
  }
}

.line-time {
  &:hover {
    .time-point {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .time-point {
    color: white;
    margin-left: -10px;
    border: 2px solid orange;
    border-radius: 100%;
  }
  .time-text {
    margin-left: 20px;
    font-size: 18px;
  }
  padding-top: 10px;
  color: rgb(206, 161, 123);
}
</style>
