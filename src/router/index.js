import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/authStore'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/books', name: 'Books', component: () => import('../views/BooksView.vue') },
  { path: '/book/:id', name: 'BookDetails', component: () => import('../views/BookDetailsView.vue') },
  { path: '/favorites', name: 'Favorites', component: () => import('../views/FavoritesView.vue') },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/explore', name: 'Explore', component: () => import('../views/ExploreView.vue') },
  { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue') },
  { path: '/register', name: 'Register', component: () => import('../views/RegisterView.vue') },
  { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue'), meta: { requiresAdmin: true } },
  
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/notebook',
    name: 'Notebook',
    component: () => import('../views/QuotesView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.isAuthenticated

  if (to.meta.requiresAdmin) {
    if (!authStore.isAuthenticated) {
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else if (authStore.user?.role === 'admin') {
      next()
    } else {
      next({ path: '/' })
    }
  } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } 
  
  else if ((to.name === 'Login' || to.name === 'Register') && isLoggedIn) {
    const redirectTarget = to.query?.redirect || (authStore.user?.role === 'admin' ? '/admin' : '/home')
    next(redirectTarget)
  } 
  
  else {
    next() 
  }
})
export default router