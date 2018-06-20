<template>
  <div class="tab">
    <el-button class="button-add" type="primary" icon="el-icon-plus" circle></el-button>
    <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabTitle" :key="item" :label="item" :name="item">
        <el-card class="tab-card" shadow="hover">
          {{item}}
        </el-card>
        <el-pagination background layout="prev, pager, next" :total="50">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "Tab",
    computed: {
      ...mapState({
        filesClass: state => state.user.filesClass,
      }),
      tabTitle() {
        return ['全部'].concat(this.filesClass)
      }
    },
    data() {
      return {
        activeName: '全部'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="scss">
  .tab {
    .button-add {
      position: fixed;
      right: 50px;
      bottom: 50px;
    }
    .tab-card {
      margin-left: 50px;
      margin-bottom: 40px;
    }
  }
</style>
