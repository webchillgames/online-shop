import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import CartView from '../views/CartView.vue'
import ARView from '../views/ARView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/products',
      component: ProductsView
    },
    {
      path: '/cart',
      component: CartView
    },
    {
      path: '/ar',
      component: ARView
    },
  ]
})

export default router
