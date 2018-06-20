import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Tab from '../components/Home/Tab.vue'
import Message from '../components/Home/Message.vue'
import Setting from '../components/Home/Setting.vue'
import Login from '../pages/Login.vue'
import NotLogin from '../pages/NotLogin.vue'
import Square from '../components/Square/Square.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home,
      children: [{
        path: '',
        name: 'Tab',
        component: Tab
      },
      {
        path: '/message',
        name: 'Message',
        component: Message
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting
      }]
    },
    {
      path: 'square',
      name: 'Square',
      component: Square
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/youShouldLogin',
      name: 'NotLogin',
      component: NotLogin
    }
  ]
})
