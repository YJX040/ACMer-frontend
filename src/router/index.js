<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import UserPage from '../components/UserPage.vue'
import ProblemListPage from '../components/ProblemListPage.vue'
import ContestListPage from '../components/ContestListPage.vue'
import UserRankingPage from '../components/UserRankingPage.vue'
import RecommendationPage from '../components/RecommendationPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/user', component: UserPage },
  { path: '/problems', component: ProblemListPage },
  { path: '/contests', component: ContestListPage },
  { path: '/rankings', component: UserRankingPage },
  { path: '/recommendations', component: RecommendationPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
=======
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
>>>>>>> 841dd7bcb5f457f53ca1951d3b3d76c54f132c44
