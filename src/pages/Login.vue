<template>
  <div></div>
</template>

<script>
export default {
  async mounted () {
    if (this.$route.query) {
      let query = this.$route.query
      try {
        this.$service.user.Login.call(this, query.code, query.state)
        if (query.redirectUrl) {
          window.location.href = query.redirectUrl
        } else {
          this.$router.push({ name: 'Home' })
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          this.$notify.error({
            title: message
          })
        })
      }
    } else {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
