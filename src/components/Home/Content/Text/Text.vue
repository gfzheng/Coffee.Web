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
        <edit-card v-if="newVisible"></edit-card>
    </transition>
    <content-card v-for="(content, index) in contents" :contentData="content" :key="index"></content-card>
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
    data() {
      return {
        searchText: '',
        newVisible: false,
        contents: [{
          id: '123542334',
          title: '我是一个标题',
          content: '        我是一个内容我是一个   内容我是一个内容我是一个内容我是一个内容我是一个内容我是\n一个内容我是一个内容我是\n一个内容我是一个内容我是一个内容我是一个内容我是一个内容我是\n一个内容我是一个内容我是\n一个内容我是一个内容我是一个内容我是一个内容我是一个内容我是\n一个内容我是一个内容我是\n一个内容我是一个内容我是一个内容我是一个内容我是一个内容我是一个内容我是一个内容我是一个内容我是一个内容我是一个内容我是\n一个内容我是一个内容我是\n一个内容我是一个内容我是一个内容我是一个内容',
          time: new Date(),
          likeNum: 122,
          commentNum: 12,
          tags: ['有趣', '日记'],
          isPublic: false,
          comments:[
            {
              userId:'12345',
              userName: 'ZhenlyChen',
              content: 'Hello, world',
              likeNum: 33,
              avatar: 'https://violet-1252808268.cosgz.myqcloud.com/5a423d7b1957c732d450a4ac.jpg',
              time: new Date(),
              reply: []
            },
            {
              userId:'12345',
              userName: 'ZhenlyChen',
              content: 'Hello, world',
              likeNum: 33,
              avatar: 'https://violet-1252808268.cosgz.myqcloud.com/5a423d7b1957c732d450a4ac.jpg',
              time: new Date(),
              reply: [{
                userId: '4567',
                userName: 'MegaShow',
                fatherId: '12345',
                fatherName: 'ZhenlyChen',
                content: 'No bb',
                time: new Date()
              },{
                userId: '12345',
                userName: 'ZhenlyChen',
                fatherId: '4567',
                fatherName: 'MegaShow',
                content: 'I bb',
                time: new Date()
              }]
            }
          ]
        },{
          id: '123542334',
          title: '我还是一个标题',
          content: '我还是一个内容',
          time: new Date(),
          likeNum: 5432,
          commentNum: 23,
          tags: ['无趣', '月记'],
          isPublic: true,
          comments:[
            {
              userId:'12345',
              userName: 'ZhenlyChen',
              content: 'Hello, world',
              likeNum: 33,
              avatar: 'https://violet-1252808268.cosgz.myqcloud.com/5a423d7b1957c732d450a4ac.jpg',
              time: new Date(),
              reply: [{
                userId: '4567',
                userName: 'MegaShow',
                fatherId: '12345',
                fatherName: 'ZhenlyChen',
                content: 'No bb',
                time: new Date()
              },{
                userId: '12345',
                userName: 'ZhenlyChen',
                fatherId: '4567',
                fatherName: 'MegaShow',
                content: 'I bb',
                time: new Date()
              }]
            }
          ]
        }]
      }
    },
    methods: {

      showNewCard() {
        this.newVisible = true;
      },

      closeNewCard() {
        this.newVisible = false;
      }
    },
    mounted() {
      this.title = this.$util.formatDate(new Date(), 'M月dd日')
      this.nowTime = this.$util.formatDate(new Date(), 'yyyy-M-dd hh:mm')
      setInterval(_ => {
        this.nowTime = this.$util.formatDate(new Date(), 'yyyy-M-dd hh:mm')
      }, 30000)
    }
  }
</script>


<style lang="scss">
  .content-text {
    margin-left: 50px;
    text-align: left;
    border-left: 3px solid rgb(220, 220, 220);
    .pagination{
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
