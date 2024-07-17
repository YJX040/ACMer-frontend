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
import AdminCFUser from '@/views/admin/AdminCFUser.vue'
import NotFound from '@/views/404.vue'
import Account from '@/views/user/ShowAccount.vue'
import ProblemDetail from '@/components/ProblemDetail.vue'
import UserDetails from '@/components/UserDetails.vue'
import AdminUserDetail from '@/views/admin/AdminUserDetail.vue'
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
    path: '/admin/useradmin',
    name: 'adminuser',
    component: AdminUser,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin/cfuseradmin',
    name: 'adminproblem',
    component: AdminCFUser,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/train/problem:id',
    name: 'problem',
    component: ProblemDetail,
    props: true,
  },
  {
    path: '/userlist/:id',
    name: 'userdetails',
    component: UserDetails,
    props: true,
  },
  {
    path: '/admin/user/:id',
    name: 'adminuserdetails',
    component: AdminUserDetail,
  },
  {
    path: '/404',
    name: '404component',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
    redirect: '/404',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
