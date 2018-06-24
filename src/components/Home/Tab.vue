<template>
  <div class="tab">
    <el-button :class="[windowsScroll > 300 ? 'button-top': 'button-top-none']" type="success" icon="el-icon-arrow-up" circle @click="toTop"></el-button>
    <el-button class="button-add" type="primary" icon="el-icon-plus" circle></el-button>
    <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="text">
        <span slot="label"><i class="fa fa-commenting-o fa-fw"></i> 文字</span>
        <tab-text/>
      </el-tab-pane>
      <el-tab-pane name="picture">
        <span slot="label"><i class="fa fa-picture-o fa-fw"></i> 相册</span>
        <el-card class="tab-card" shadow="hover">
          Coming soon...
        </el-card>
        <!-- <el-pagination background layout="prev, pager, next" :page-size="15" :total="500"> -->
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane name="movie">
        <span slot="label"><i class="fa fa-film fa-fw"></i> 电影</span>
        <el-card class="tab-card" shadow="hover">
          Coming soon...
        </el-card>
        <!-- <el-pagination background layout="prev, pager, next" :page-size="15" :total="500"> -->
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane name="app">
        <span slot="label"><i class="fa fa-cubes fa-fw"></i> 应用</span>
        <el-card class="tab-card" shadow="hover">
          Coming soon...
        </el-card>
        <!-- <el-pagination background layout="prev, pager, next" :page-size="15" :total="500"> -->
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane name="game">
        <span slot="label"><i class="fa fa-gamepad fa-fw"></i> 游戏</span>
        <el-card class="tab-card" shadow="hover">
          Coming soon...
        </el-card>
        <!-- <el-pagination background layout="prev, pager, next" :page-size="15" :total="500"> -->
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane name="doc">
        <span slot="label"><i class="fa fa-file-text-o fa-fw"></i> 文档</span>
        <el-card class="tab-card" shadow="hover">
          Coming soon...
        </el-card>
        <!-- <el-pagination background layout="prev, pager, next" :page-size="15" :total="500"/> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tabText from './Content/Text/Text'
  export default {
    name: "Tab",
    components: {
      tabText,
    },
    computed: {},
    data() {
      return {
        activeName: 'text',
        windowsScroll: 0
      };
    },
    methods: {
      toTop() {
        window.scroll({"behavior": "smooth", "top": 0})
      },

      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    mounted() {
      window.onscroll = _ => {
        this.windowsScroll = window.scrollY
      }
    }
  };
</script>

<style lang="scss">
  .tab {
    .button-add {
      display: none;
      z-index: 100;
      position: fixed;
      right: 50px;
      bottom: 50px;
    }
    .button-top {
      position: fixed;
      bottom: 40px;
      left: 40px;
    }
    .button-top-none {
      display: none;
    }
    .tab-card {
      margin-left: 50px;
      margin-bottom: 40px;
    }
  }


</style>
