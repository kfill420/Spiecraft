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
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import('../views/AboutView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (JSON.parse(localStorage.getItem('token'))) {
      console.log(JSON.parse(localStorage.getItem('token')));
      const token = JSON.parse(localStorage.getItem('token')).token;
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
