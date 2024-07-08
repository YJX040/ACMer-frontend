import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/user/Login.vue';
import Register from '@/views/user/Register.vue';
import User from '@/views/user/User.vue';
import Contest from '@/views/cf/contest/Contest.vue';
import Rank from '@/views/cf/rank/Rank.vue';
import CFUser from '@/views/cf/user/CFUser.vue';
import Train from '@/views/train/Train.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/user', component: User },
  { path: '/cf/contest', component: Contest },
  { path: '/cf/rank', component: Rank },
  { path: '/cf/user', component: CFUser },
  { path: '/train', component: Train },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
