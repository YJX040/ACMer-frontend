import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Manager',
      component: () => import('@/views/Manager.vue'),

    },
    {
      path: '/login', name: 'Login', component: () => import('@/views/Login.vue')
    },
    {
      path: '/register', name: 'Register', component: () => import('@/views/Register.vue')
    },
    {
      path: '/header', name: 'Header', component: () => import('@/views/Header.vue')
    }
  ]
})

export default router
