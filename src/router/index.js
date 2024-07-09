import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/user/Login.vue'
import Register from '@/views/user/Register.vue'
import Contest from '../views/cf/contest/Contest.vue'
import CFUser from '@/views/cf/user/CFUser.vue'
import Rank from '@/views/cf/rank/Rank.vue'
import Train from '@/views/train/Train.vue'
import User from '@/views/user/User.vue'
import CF from '@/views/cf/CF.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'logout',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/cf/contest',
    name: 'contest',
    component: Contest,
  },
  {
    path: '/cf/user',
    name: 'cfuser',
    component: CFUser,
  },
  {
    path: '/cf/rank',
    name: 'rank',
    component: Rank,
  },
  {
    path: '/train',
    name: 'train',
    component: Train,
  },
  {
    path: '/user',
    name: 'user',
    component: User,
  },
  {
    path: '/cf',
    name: 'cf',
    component: CF,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
