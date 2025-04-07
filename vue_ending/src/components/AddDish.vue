<template>
  <div>
    <h2>上架菜品</h2>
    <form @submit.prevent="addDish" class="add-dish-form">
      <input v-model="newDish.name" placeholder="菜名" required class="input-field" />
      <input v-model="newDish.price" type="number" placeholder="价格" required class="input-field" />
      <input v-model="newDish.stock" type="number" placeholder="库存" required class="input-field" />
      <input type="file" @change="handleImageUpload" class="file-input" />
      <button type="submit" class="submit-button">上架</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

// 创建新的axios实例专门用于文件上传
const uploadAxios = axios.create();

// 针对文件上传的axios实例设置请求拦截器
uploadAxios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'multipart/form-data';
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 统一处理响应错误提示等
uploadAxios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    console.error('请求错误，状态码：', error.response.status);
    console.error('响应数据：', error.response.data);
  } else if (error.request) {
    console.error('请求未收到响应');
  } else {
    console.error('请求配置错误：', error.message);
  }
  return Promise.reject(error);
});

export default {
  name: 'AddDish',
  data() {
    return {
      newDish: {
        name: '',
        price: '',
        stock: '',
        image: ''
      },
      dishes: []
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        uploadAxios.post('http://localhost:3000/upload-image', formData)
        .then((response) => {
            this.newDish.image = response.data.imageUrl;
          })
        .catch((error) => {
            console.error('上传失败', error);
          });
      }
    },
    addDish() {
      if (!this.newDish.image) {
        alert('请上传图片！');
        return;
      }

      axios.post('http://localhost:3000/add-dish', this.newDish)
      .then((response) => {
          alert('菜品已成功添加');
          this.$store.commit('addDish', {...this.newDish, id: Date.now() });
          this.newDish = { name: '', price: '', stock: '', image: '' };
        })
      .catch((error) => {
          console.error('添加菜品失败', error);
        });
    }
  }
};
</script>

<style scoped>
.add-dish-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.input-field,
.file-input,
.submit-button {
  margin: 10px 0;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.dish-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 10px;
}
</style>