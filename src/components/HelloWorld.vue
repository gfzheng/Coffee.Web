<template>
  <div>
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
  async mounted() {
    try {
      await this.$service.user.GetInfo.call(this)
    } catch(error) {
      this.$store.commit("logout")
    }
  }
}
</script>

<style>
</style>
