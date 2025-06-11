import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Views below may need real component files to be created soon.
const LogSessionView = () => import('../views/LogSessionView.vue') // placeholder/future
const SessionDetailView = () => import('../views/SessionDetailView.vue') // placeholder/future
const StatsDashboardView = () => import('../views/StatsDashboardView.vue') // placeholder/future

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Wave History',
      component: HomeView,
      meta: { icon: '🌊' } // For use in nav if needed
    },
    {
      path: '/log',
      name: 'Log Session',
      component: LogSessionView,
      meta: { icon: '🏄‍♂️' }
    },
    {
      path: '/session/:id',
      name: 'Session Detail',
      component: SessionDetailView,
      props: true,
      meta: { icon: '🌅' }
    },
    {
      path: '/stats',
      name: 'Stats Dashboard',
      component: StatsDashboardView,
      meta: { icon: '🏖️' }
    },
    // Optionally, fallback/404 route can be added here
  ]
})

export default router
