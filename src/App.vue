<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import Nav from './components/Nav'
  export default {
    components: {
      Nav
    },
    computed: {
      ...mapState({
        logged: state => state.user.logged
      })
    },
    async mounted() {
      console.log(this.logged,this.$route.name)
      console.log(this.$route.name !== 'Login')
      if (this.$route.name !== 'Login') {
        try{
          await this.$service.user.GetInfo.call(this)
        } catch(err) {
          this.$service.user.Logout.call(this)
        }
      }
    },
    name: 'App'
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-width: 500px;
  }
</style>
