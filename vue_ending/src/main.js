import { createApp } from 'vue';  // 使用 Vue 3 的创建方式
import App from './App.vue';
import store from './store';  // 引入 Vuex store
import router from './router';  // 引入 Vue Router

createApp(App)
  .use(store)  // 注册 Vuex store
  .use(router)  // 注册 Vue Router
  .mount('#app');  // 挂载 Vue 应用
