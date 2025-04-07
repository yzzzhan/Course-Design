import { createRouter, createWebHistory } from 'vue-router';
import Menu from '../components/Menu.vue'; 
import Checkout from '../components/Checkout.vue';
import AddDish from '../components/AddDish.vue';
import OrderSummary from '../components/OrderSummary.vue';

const routes = [
  { path: '/', component: Menu, name: 'menu' },
  { path: '/checkout', component: Checkout, name: 'checkout' },
  { path: '/add-dish', component: AddDish, name: 'addDish' },
  { path: '/order-summary', component: OrderSummary, name: 'orderSummary' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
