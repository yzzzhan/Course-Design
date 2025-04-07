<template>
  <div class = "head">忻忻的深夜食堂</div>
  <div class="sidebar-buttons">
    <button @click="navigate('menu')">点餐</button>
    <button @click="navigate('checkout')">结算</button>
    <button @click="navigate('addDish')">上架菜品</button>
    <button @click="navigate('orderSummary')">订单总览</button>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    navigate(page) {
      this.$router.push({ name: page });
    }
  }
};
</script>

<style scoped>
.head{
  color: rgb(132, 197, 251);
  font-size:x-large;
  text-align: center;
  padding-bottom: 40px;
  margin: 20px;
}

.sidebar-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

button {
  background-color: #6a90e9;
  color: rgb(255, 255, 255);
  padding: 12px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #2e1bc0;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .sidebar-buttons {
    flex-direction: row;
    justify-content: space-around;
  }
  
  button {
    margin: 5px;
    width: auto;
  }
}
</style>
