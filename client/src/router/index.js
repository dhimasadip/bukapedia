import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue'
import Cart from '../views/Cart.vue'
import Transactions from '../views/Transactions.vue'
import DetailProduct from '../views/DetailProduct.vue'
// import SignIn from '../components/ModalSignIn.vue'

// {
//   path: '/signin',
//   name: 'SignIn',
//   component: SignIn
// },

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/my-cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  },
  {
    path: '/product/:id',
    name: 'DetailProduct',
    component: DetailProduct
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'DetailProduct') next()
  else if (to.name !== 'Dashboard' && !localStorage.access_token) next({ name: 'Dashboard' })
  else next()
})

export default router;
