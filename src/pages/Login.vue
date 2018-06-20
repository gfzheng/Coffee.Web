<template>
  <div></div>
</template>

<script>
export default {
  async mounted () {
    if (this.$route.query) {
      let query = this.$route.query
      try {
        await this.$service.user.Login.call(this, query.code, query.state)
        console.log(query.redirectUrl)
        if (query.redirectUrl && query.redirectUrl !== 'NotLogin') {
          this.$router.push({ name: query.redirectUrl })
        } else {
          this.$router.push({ name: 'Tab' })
        }
      } catch (error) {
        this.$service.errorHandle.call(this, error, message => {
          this.$notify.error({
            title: message
          })
        })
      }
    } else {
      this.$router.push({ name: 'NotLogin' })
    }
  }
}
</script>
