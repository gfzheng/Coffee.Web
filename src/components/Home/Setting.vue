<template>
  <div class="setting">
    <el-card shadow="hover">
      <div slot="header">
        <i class="fa fa-sliders fa-fw" aria-hidden="true"></i> 个人设置
      </div>
      <div class="item-space" index="Space">
        <p class="space-name"> 用户类型：
          <el-tag size="small">{{userClass}}</el-tag>
        </p>
        <p class="space-title">空间：{{textUsedSize}} / {{textMaxSize}}</p>
        <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="spacePercentage" color="#8e71c7"></el-progress>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        class: state => state.user.class,
        logged: state => state.user.logged,
        name: state => state.user.name,
        avatar: state => state.user.info.Avatar,
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
      },
      userClass() {
        let textClass = '普通用户'
        switch(this.class) {
          case -2:
            textClass = '黑名单'
            break
          case -1:
            textClass = '受限'
            break
          case 0:
            textClass = '未认证'
            break
          case 1:
            textClass = '已认证'
            break
          case 10:
            textClass = 'VIP'
            break
          case 50:
            textClass = '管理员'
            break
          case 99:
            textClass = '超级管理员'
            break
          default:
            textClass = '未知'
        }
        return textClass
      }
    },
    data() {
      return {
        activeIndex: 'Home',
        notif: true,
        notifCount: 5,
        textSize: ['KB', 'MB', 'GB', 'TB']
      };
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
      }
    }
  }
</script>

<style lang="scss">
  .setting {
    text-align: left;
  }
</style>
