import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/user/Login.vue'
import Register from '@/views/user/Register.vue'
import Contest from '../views/cf/contest/Contest.vue'
import CFProblem from '@/views/cf/problem/CFProblem.vue'
import Rank from '@/views/cf/rank/Rank.vue'
import Train from '@/views/train/Train.vue'
import User from '@/views/user/User.vue'
import CF from '@/views/cf/CF.vue'
import UserList from '@/views/user/UserList.vue'
import Admin from '@/views/admin/Admin.vue'
import AdminUser from '@/views/admin/AdminUser.vue'
import AdminProblem from '@/views/admin/AdminProblem.vue'
import AddProblem from '@/views/admin/AddProblem.vue'
import AddUser from '@/views/admin/AddUser.vue'
import NotFound from '@/views/404.vue'

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
    path: '/cf/problem',
    name: 'cfproblem',
    component: CFProblem,
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
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: UserList,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin/user',
    name: 'adminuser',
    component: AdminUser,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin/problem',
    name: 'adminproblem',
    component: AdminProblem,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin/addproblem',
    name: 'addproblem',
    component: AddProblem,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin/adduser',
    name: 'adduser',
    component: AddUser,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
