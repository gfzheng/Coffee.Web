import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Tab from '../components/Home/Tab.vue'
import Message from '../components/Home/Message.vue'
import Setting from '../components/Home/Setting.vue'
import Login from '../pages/Login.vue'
import NotLogin from '../pages/NotLogin.vue'
import Square from '../components/Square/Square.vue'
import Detail from '../components/Home/Content/Detail'

import User from '../components/Home/User.vue'

import CommentBox from '../components/Home/Message/CommentBox.vue'
import LikeBox from '../components/Home/Message/LikeBox.vue'
import MessageBox from '../components/Home/Message/MessageBox.vue'
import SystemBox from '../components/Home/Message/SystemBox.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
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
        component: Message,
        children: [{
          path: '/message/comment',
          name: 'CommentBox',
          component: CommentBox
        }, {
          path: '/message/like',
          name: 'LikeBox',
          component: LikeBox
        }, {
          path: '/message/messagebox',
          name: 'MessageBox',
          component: MessageBox
        }, {
          path: '/message/system',
          name: 'SystemBox',
          component: SystemBox
        }]
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting
      }]
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
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
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    },
    {
      path: '',
      name: 'Square',
      component: Square
    }
  ]
})
