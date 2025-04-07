import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
    dishes: [
      { id: 1, name: '麻辣羊排', price: 58, stock: 50, image: 'src/assets/photo/photo1.jpg' },
      { id: 2, name: '咖喱牛肉', price: 32, stock: 30, image: 'src/assets/photo/photo2.jpg' },
      { id: 3, name: '小酥肉', price: 68, stock: 40, image: 'src/assets/photo/photo3.jpg' },
      { id: 4, name: '烤馕', price: 45, stock: 20, image: 'src/assets/photo/photo4.jpg' },
      { id: 5, name: '煲仔饭', price: 38, stock: 35, image: 'src/assets/photo/photo5.jpg' },
      { id: 6, name: '大骨汤', price: 58, stock: 60, image: 'src/assets/photo/photo6.jpg' },
      { id: 7, name: '蜜汁烤鸡', price: 28, stock: 50, image: 'src/assets/photo/photo7.jpg' },
      { id: 8, name: '泡椒鸡爪', price: 32, stock: 20, image: 'src/assets/photo/photo8.jpg' },
      { id: 9, name: '尖椒鸡', price: 78, stock: 10, image: 'src/assets/photo/photo9.jpg' },
      { id: 10, name: '清蒸鲈鱼', price: 18, stock: 50, image: 'src/assets/photo/photo10.jpg' },
    ],
    orders: [],
    tableNumber: null,
    paymentStatus: '',
  },
  getters: {
    cart: (state) => state.cart,
    dishes: (state) => state.dishes,
    orders: (state) => state.orders,
    tableNumber: (state) => state.tableNumber,
    paymentStatus: (state) => state.paymentStatus,
  },
  mutations: {
    addToCart(state, dish) {
      const existingDish = state.cart.find(item => item.id === dish.id);
      if (existingDish) {
        existingDish.quantity += dish.quantity;
      } else {
        state.cart.push({ ...dish, quantity: dish.quantity });
      }
    },
    increaseQuantity(state, dishId) {
      const dish = state.cart.find(item => item.id === dishId);
      if (dish && dish.quantity < dish.stock) {
        dish.quantity += 1;
      }
    },
    decreaseQuantity(state, dishId) {
      const dish = state.cart.find(item => item.id === dishId);
      if (dish && dish.quantity > 1) {
        dish.quantity -= 1;
      }
    },
    addDish(state, newDish) {
      state.dishes.push(newDish);
    },
    generateTableNumber(state) {
      state.tableNumber = Math.floor(Math.random() * 1000);
    },
    updatePaymentStatus(state, status) {
      state.paymentStatus = status;
    },
    placeOrder(state, order) {
      state.orders.push(order);
    },
    clearCart(state) {
      state.cart = [];
    },
    markAsServed(state, order) {
      const index = state.orders.findIndex(o => o.time === order.time);
      if (index !== -1) {
        state.orders[index].status = '已出单';
      }
    },
  },
  actions: {
     placeOrder({ commit, state }) {
      const order = {
        tableNo: state.tableNumber,
        dishes: [...state.cart],
        time: new Date().toLocaleString(),
        status: '已下单',
        totalPrice: state.cart.reduce((total, dish) => total + dish.price * dish.quantity, 0),
      };
      commit('placeOrder', order);
      commit('clearCart');
    },
  },
});
