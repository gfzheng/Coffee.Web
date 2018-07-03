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
  async mounted () {
    if (this.$route.name !== 'Login') {
      try {
        let res = await this.$service.user.GetInfo.call(this)
        if (res.State !== 'success') {
          if (this.$route.name !== 'Square' && this.$route.name !== 'User') {
            throw "not_login"
          } else {
            this.$store.commit('logout')
          }
        } else {
          this.$store.commit('setInfo', res)
        }
      } catch (err) {
        this.$service.user.Logout.call(this)
      }
    }
  },
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 500px;
  height: 100%;
}
body,
html {
  background: rgb(245, 245, 245);
  height: 100%;
  scroll-behavior: smooth;
}
</style>
