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
      <el-button @click="updateInfo">修改个人信息</el-button>
      <el-button @click="updateName">修改昵称</el-button>
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
    textUsedSize () {
      return this.fixSizeNum(this.usedSize)
    },
    textMaxSize () {
      return this.fixSizeNum(this.maxSize)
    },
    spacePercentage () {
      if (this.maxSize === 0) return 0
      return parseFloat((this.usedSize / this.maxSize).toFixed(2))
    },
    userClass () {
      let textClass = '普通用户'
      switch (this.class) {
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
  data () {
    return {
      activeIndex: 'Home',
      notif: true,
      notifCount: 5,
      textSize: ['KB', 'MB', 'GB', 'TB']
    };
  },
  methods: {
    fixSizeNum (num) {
      let typeSize = 0
      let size = num
      while (size > 1024) {
        size /= 1024
        typeSize++
      }
      return size.toFixed(1) + this.textSize[typeSize]
    },

    updateName () {
      this.$prompt('请输入你的新昵称：', '修改昵称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: val => val != "" && !(/[<|> "'{}:;]+/.test(val)),
        inputErrorMessage: '昵称不合法'
      }).then(async ({ value }) => {
        try {
          await this.$service.user.SetName.call(this, value)
        } catch (error) {
          this.$service.errorHandle.call(this, error)
        }
      })
    },

    updateInfo () {
      this.$alert('是否跳转到Violet用户中心，修改你的个性信息', '修改个性信息', {
        confirmButtonText: '跳转',
        callback: action => {
          if (action != 'confirm') return
          let newWin = window.open('about:blank')
          newWin.location.href = "https://oauth.xmatrix.studio/Verify/Authorize"
          this.$alert('请在弹出页面中修改你的信息，修改成功后按确定', '修改个性信息', {
            confirmButtonText: '修改好了',
            callback: async action => {
              try {
                await this.$service.user.GetNewInfo.call(this)
              } catch (error) {
                this.$service.errorHandle.call(this, error)
              }
            }
          })
        }
      })

    }
  }
}
</script>

<style lang="scss">
.setting {
  text-align: left;
}
</style>
