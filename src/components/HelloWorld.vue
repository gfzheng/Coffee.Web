<template>
  <div>
    <Button @click="Login">Login</Button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    async Login() {
      try {
        const res = await this.$service.user.GetVioletURL.call(this, window.location.href)
        console.log(res)
        window.location.href = res.Data
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          this.$notify.error({
            title: message
          })
        })
      }
    }
  }
}
</script>

<style>
</style>
