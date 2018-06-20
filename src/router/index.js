import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Login from '../pages/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
