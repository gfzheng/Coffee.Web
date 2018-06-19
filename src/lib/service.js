const userService = require('./services/user')

const service = {
  install: function (Vue, options) {
    Vue.prototype.$service = {
      user: userService.default,
      errorHandle: this.errorHandle
    }
  },
  errorHandle: function (error, callback) {
    console.error(error)
    if (error.response && error.response.status === 400) {
      if (callback) {
        callback(error.response.data)
      } else {
        this.$notify.error({
          title: '发生错误',
          desc: '未知错误：' + error.response.data
        })
      }
    } else {
      this.$notify.error({
        title: '发生错误',
        desc: '无法连接服务器'
      })
    }
  }
}
export default service
