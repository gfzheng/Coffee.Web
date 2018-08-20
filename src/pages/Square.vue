<template>
  <div class="square">
    <top-button/>
    <transition name="el-zoom-in-top">
      <el-button :disabled="getNew" v-if="windowsScroll < 300" class="button-reflesh" type="primary" icon="el-icon-refresh" circle @click="toReflesh"></el-button>
    </transition>
    <transition name="el-zoom-in-top">
      <div class="newText" v-if="getNew">
        <i class="el-icon-loading loading-icon"></i>努力获取新内容 😊</div>
    </transition>
    <el-row type="flex" :gutter="20" justify="center">
      <el-col :span="16">
        <square-card :contentData="content" v-for="content in contents" :key="content.Data.ID"/>
        <div v-if="!noMore" class="load-more" @click="loadMore">
          <el-card shadow="hover">点击加载更多</el-card>
        </div>
        <div class="nothing-more" v-else>
          真的是没有了...😂
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SquareCard from '../components/SquareCard'
import TopButton from '../components/TopButton'
import { mapState } from 'vuex';
export default {
  components: {
    SquareCard, TopButton
  },
  computed: {
    ...mapState({
      contents: s => s.content.content
    })
  },
  data () {
    return {
      getNew: false,
      windowsScroll: 0,
      noMore: false,
      page: 1,
    };
  },
  methods: {
    async GetPublic () {
      try {
        let res = await this.$service.content.GetPublic.call(this, this.page, 7)
        if (res.Data === null || res.Data.length == 0) {
          this.noMore = true
          return
        }
        this.$store.commit("setContent", this.contents.concat(res.Data))
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },

    loadMore () {
      this.page++
      this.GetPublic()
    },

    toReflesh () {
      this.noMore = false
      this.page = 1
      this.$store.commit("setContent", [])
      this.GetPublic()
      this.getNew = true
      setTimeout(() => {
        this.getNew = false
      }, 1000)
    }
  },
  mounted () {
    if (this.contents.length == 0) {
      this.GetPublic()
    }
    window.addEventListener('scroll', (e) => {
      this.windowsScroll = window.scrollY
    })
  }
}
</script>

<style lang="scss">
.square {
  padding-top: 100px;
  background: rgb(245, 245, 245);
  text-align: left;
  min-height: 800px;
  .newText {
    text-align: center;
    margin-bottom: 40px;
    .loading-icon {
      margin-right: 10px;
    }
  }
  .button-reflesh {
    z-index: 1025;
    position: fixed;
    bottom: 40px;
    left: 40px;
  }
  .load-more {
    user-select: none;
    cursor: pointer;
    text-align: center;
    margin-bottom: 50px;
  }
  .nothing-more {
    user-select: none;
    text-align: center;
    margin-bottom: 50px;
  }

  .right-fixed {
    min-width: 200px;
    position: fixed;
    right: 30px;
    top: 120px;
  }
}
</style>
