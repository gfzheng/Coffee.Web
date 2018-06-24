<template>
  <div class="home-message">
    <el-row type="flex" justify="space-between" :gutter="30">
      <el-col class="message-menu" :span="6">
        <el-menu :default-active="activeIndex" @select="handleSelect">
          <el-menu-item index="comments">
            <i class="fa fa-comment-o fa-fw fa-menu" aria-hidden="true"></i>
            <span slot="title">收到的评论
              <el-badge v-if="unread.reply > 0" :value="unread.reply" />
            </span>
          </el-menu-item>
          <el-menu-item index="likes">
            <i class="fa fa-heart fa-fw fa-menu" aria-hidden="true"></i>
            <span slot="title">收到的点赞
              <el-badge v-if="unread.like > 0" :value="unread.like" />
            </span>
          </el-menu-item>
          <el-menu-item index="messages">
            <i class="fa fa-envelope-o fa-fw fa-menu" aria-hidden="true"></i>
            <span slot="title">私信
              <el-badge v-if="unread.mail > 0" :value="unread.mail" />
            </span>
          </el-menu-item>
          <el-menu-item index="system">
            <i class="el-icon-bell"></i>
            <span slot="title">系统通知
              <el-badge v-if="unread.system > 0" :value="unread.system" />
            </span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="16">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      unread: s => s.message.unread
    })
  },
  data () {
    return {
      activeIndex: 'comments',
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      switch (key) {
        case 'comments':
          this.$router.push({ name: 'CommentBox' })
          break
        case 'likes':
          this.$router.push({ name: 'LikeBox' })
          break
        case 'messages':
          this.$router.push({ name: 'MessageBox' })
          break
        case 'system':
          this.$router.push({ name: 'SystemBox' })
          break
      }
    },
    async GetMessage () {
      try {
        let res = await this.$service.notification.Get.call(this)
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }
  },
  mounted () {
    switch (this.$route.path) {
      case '/message/comment':
        this.activeIndex = 'comments'
        break
      case '/message/like':
        this.activeIndex = 'likes'
        break
      case '/message/messagebox':
        this.activeIndex = 'messages'
        break
      case '/message/system':
        this.activeIndex = 'system'
        break
    }
    this.GetMessage()
  }
}
</script>

<style lang="scss">
.home-message {
  text-align: left;
  .message-menu {
    min-width: 250px;
  }
  .fa-menu {
    margin-right: 5px;
    width: 24px;
  }
}
</style>
