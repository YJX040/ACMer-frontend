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
