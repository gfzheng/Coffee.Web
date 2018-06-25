<template>
  <div></div>
</template>

<script>
export default {
  methods: {
    async GetMessage () {
      try {
        await this.$service.notification.Get.call(this)
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    }
  },
  async mounted () {
    if (this.$route.query) {
      let query = this.$route.query
      try {
        await this.$service.user.Login.call(this, query.code, query.state)
        this.GetMessage()
        this.$router.push({ name: 'Tab' })
        // console.log(query.redirectUrl)
        // if (query.redirectUrl && query.redirectUrl !== 'NotLogin') {
        //   this.$router.push({ name: query.redirectUrl })
        // } else {
        //   this.$router.push({ name: 'Tab' })
        // }
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
