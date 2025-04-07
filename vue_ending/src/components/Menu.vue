<template>
  <div class="menu-container">
    <h2>菜品点餐</h2>

    <!-- 搜索功能 -->
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="搜索菜品" 
        @input="searchDishes"
      />
    </div>

    <div v-if="filteredDishes.length > 0" class="dish-list">
      <div v-for="dish in paginatedDishes" :key="dish.id" class="dish-item">
        <div class="dish-content">
          <div class="dish-text">
            <h3 class="dish-name">{{ dish.name }}</h3>
            <p class="dish-price">￥{{ dish.price }}</p>
            <p class="dish-stock">库存：{{ dish.stock }}</p>
            <button @click="addToCart(dish)" :disabled="dish.stock <= 0" class="add-to-cart-btn">
              加入购物车
            </button>
          </div>
          <div class="dish-image-wrapper">
            <img :src="getImageUrl(dish.id)" alt="Dish Image" class="dish-image" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>暂无菜品</p>
    </div>

    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Menu',
  computed: {
    dishes() {
      return this.$store.state.dishes;
    },
    cart() {
      return this.$store.state.cart;
    },
    filteredDishes() {
      if (this.searchQuery) {
        return this.dishes.filter(dish => 
          dish.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.dishes;
    },
    totalPages() {
      return Math.ceil(this.filteredDishes.length / this.itemsPerPage);
    },
    paginatedDishes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredDishes.slice(start, start + this.itemsPerPage);
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 9,
      searchQuery: '', 
    };
  },
  methods: {
    addToCart(dish) {
      if (dish.stock > 0) {
        dish.stock -= 1;
        this.$store.commit('addToCart', { ...dish, quantity: 1 });
        if (!this.tableNumber) {
          this.generateTableNumber();
        }
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) this.currentPage = page;
    },
    getImageUrl(id) {
      return this.dishes.find(dish => dish.id === id).image || 'default_image_url.jpg';
    },
    generateTableNumber() {
      this.tableNumber = Math.floor(Math.random() * 1000);
      this.$store.commit('generateTableNumber', this.tableNumber);
    },
    searchDishes() {
      this.currentPage = 1; 
    }
  }
};
</script>

<style scoped>
.menu-container {
  max-width: 1200px;
  margin: 10px auto;
  padding: 10px;
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

.search-container {
  text-align: center;
  margin-bottom: 20px;
}

.search-container input {
  padding: 10px;
  width: 80%;
  max-width: 400px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.dish-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.dish-item {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.dish-item:hover {
  transform: translateY(-10px);
}

.dish-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}

.dish-text {
  flex: 1;
  padding-right: 2px;
}

.dish-image-wrapper,
.dish-image {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dish-name {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.dish-price {
  font-size: 16px;
  color: #e74c3c;
  margin-bottom: 10px;
}

.dish-stock {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.add-to-cart-btn {
  background: #3498db;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: #2980b9;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
}

.pagination button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
  font-weight: bold;
}



.place-order-btn {
  background: #2ecc71;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}
</style>
