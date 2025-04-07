<template>
  <div class="checkout-container">
    <h2>结算</h2>
    <p>当前桌号: {{ tableNumber }}</p>

    <!-- 当前购物车内容展示 -->
    <div v-if="cart.length > 0" class="cart-items">
      <ul>
        <li v-for="item in cart" :key="item.id">
          <span>{{ item.name }} x {{ item.quantity }}</span>
          <span>￥{{ item.price * item.quantity }}</span>
        </li>
      </ul>
      <p class="total-price">商品总价: ￥{{ totalPrice }}</p>
    </div>
    <div v-else>
      <p>购物车为空</p>
    </div>

    <!-- 支付按钮 -->
    <button @click="makePayment" v-if="cart.length > 0" class="payment-btn">支付</button>

    <!-- 历史订单展示 -->
    <div v-if="orders.length > 0" class="orders-history">
      <h3>历史订单</h3>
      <div v-for="order in orders" :key="order.time" class="order-preview">
        <div class="order-details">
          <span class="order-info">桌号: {{ order.tableNo }}</span>
          <span class="order-info">时间: {{ order.time }}</span>
          <span class="order-info">总价: ￥{{ order.totalPrice }}</span>
          <span class="order-info">状态: {{ order.status }}</span>
        </div>
        <ul class="order-items">
          <li v-for="item in order.dishes" :key="item.id">
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <span>￥{{ item.price * item.quantity }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    tableNumber() {
      return this.$store.state.tableNumber;
    },
    orders() {
      return this.$store.state.orders;  // 获取所有历史订单
    },
    totalPrice() {
      return this.cart.reduce((total, dish) => total + dish.price * dish.quantity, 0);
    }
  },
  methods: {
    // 支付功能
    makePayment() {
      if (this.totalPrice <= 0) {
        this.$store.commit('updatePaymentStatus', '支付金额无效');
        return;
      }

      axios.post('http://localhost:3000/payment', {
        tableNumber: this.tableNumber,
        totalPrice: this.totalPrice,
        cart: this.cart // 传递购物车内容到后端
      })
     .then((response) => {
        const data = response.data;
        if (data.status === 'success') {
          // 支付成功，更新状态
          this.placeOrder(data.order);  // 传递返回的订单数据
          this.$store.commit('updatePaymentStatus', '支付成功');
        } else {
          // 支付失败，更新状态
          this.$store.commit('updatePaymentStatus', '支付失败');
        }
      })
     .catch((error) => {
        console.error('支付请求失败:', error);
        this.$store.commit('updatePaymentStatus', '支付失败');
      });
    },

    // 提交订单
    placeOrder(order) {
      this.$store.dispatch('placeOrder', order);  // 调用 Vuex存储订单
    }
  }
};
</script>

<style scoped>
.checkout-container {
  max-width: 1200px;
  margin: 10px auto;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.cart-items {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cart-items ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-items li {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 16px;
}

.total-price {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
  margin-top: 20px;
}

.payment-btn {
  background: #3498db;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.payment-btn:hover {
  background: #2980b9;
}

.orders-history {
  margin-top: 30px;
}

.order-preview {
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.order-details {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 10px;
}

.order-info {
  font-size: 14px;
  color: #555;
}

.order-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.order-items li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}
</style>