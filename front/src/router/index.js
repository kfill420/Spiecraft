import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CartView from '../views/CartView.vue';
import ProfilView from '@/views/ProfilView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilView,
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'CartView',
      component: CartView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (!token) next({ path: '/' });
      else {
        try {
          next();
        } catch {
          localStorage.removeItem('userData');
          next({ path: '/' })
        }
      }
    } else {
      next({ path: '/' })
    }
  } else {
    next();
  }
});

export default router
