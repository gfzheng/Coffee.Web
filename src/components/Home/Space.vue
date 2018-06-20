<template>
  <el-card class="space-card" shadow="hover">
    <div slot="header" class="card-title">
      <span>个人空间</span>
      <el-tooltip class="title-tag" effect="dark" content="增加你的存储空间" placement="bottom">
        <el-tag @click="upClass">VIP会员</el-tag>
      </el-tooltip>
    </div>
    <div>
      <el-progress type="circle" :percentage="spacePercentage" color="#8e71c7"></el-progress>
      <p>{{textUsedSize}} / {{textMaxSize}}</p>
    </div>
  </el-card>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'Space',
    computed: {
      ...mapState({
        class: state => state.user.class,
        maxSize: state => state.user.maxSize,
        usedSize: state => state.user.usedSize
      }),
      textUsedSize() {
        return this.fixSizeNum(this.usedSize)
      },
      textMaxSize() {
        return this.fixSizeNum(this.maxSize)
      },
      spacePercentage() {
        if (this.maxSize === 0) return 0
        return parseFloat((this.usedSize / this.maxSize).toFixed(2))
      }
    },
    data() {
      return {
        textSize: ['KB', 'MB', 'GB', 'TB']
      }
    },
    methods: {
      fixSizeNum(num) {
        let typeSize = 0
        let size = num
        while (size > 1024) {
          size /= 1024
          typeSize++
        }
        return size.toFixed(1) + this.textSize[typeSize]
      },
      upClass() {

      }
    }
  }
</script>

<style lang="scss">
  .space-card {
    .card-title {
      text-align: left;
      margin-top: 5px;
    }
    .title-tag {
      margin-top: -5px;
      float: right;
      cursor: pointer;
      pointer-events: all;
      a {
        cursor: pointer;
      }
    }
  }
</style>

