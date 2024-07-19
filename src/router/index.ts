import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '@/views/MenuView.vue'
import LoginView from '@/views/LoginView.vue'
import ViewPage from '@/views/ViewPage.vue'
import TargetView from '@/views/TargetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/view',
      name: 'view',
      component: ViewPage
    },
    {
      path: '/target',
      name: 'target',
      component: TargetView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    }
  ]
})

export default router
