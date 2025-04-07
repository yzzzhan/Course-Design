<template>
  <div>
    <h2>订单总览</h2>
    <div v-if="sortedOrders.length > 0">
      <div v-for="order in sortedOrders" :key="order.time" class="order-item">
        <p>桌号: {{ order.tableNo }} | 时间: {{ order.time }} | 状态: {{ order.status }}</p>
        <div v-for="dish in order.dishes" :key="dish.id">
          <p>{{ dish.name }} x {{ dish.quantity }} | ￥{{ dish.price * dish.quantity }}</p>
        </div>
        <p>总价: ￥{{ order.totalPrice }}</p>
        <button v-if="order.status === '已下单'" @click="markAsServed(order)">出餐</button>
        <span v-else>已出单</span>
      </div>
    </div>
    <div v-else>
      <p>暂无订单</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSummary',
  computed: {
    sortedOrders() {
      return this.$store.state.orders.sort((a, b) => new Date(b.time) - new Date(a.time));  // 按时间降序排序
    }
  },
  methods: {
    markAsServed(order) {
      this.$store.commit('markAsServed', order);
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 40px 0 20px;
  text-align: center;
}

.order-item {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.order-item p {
  margin: 8px 0;
  font-size: 16px;
  color: #555;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, transform 0.2s ease;
}

button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

span {
  font-size: 16px;
  font-weight: bold;
  color: #888;
}

@media (max-width: 768px) {
  .order-item {
    padding: 15px;
  }

  button {
    padding: 8px 16px;
  }
}
</style>