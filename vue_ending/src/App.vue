<template>
  <div id="app">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  }
};
</script>

<style>
#app {
  display: flex;
  min-height: 100vh;
  width: 100%; /* 确保宽度为100% */
}

.sidebar {
  width: 30%;
  background-color: #343a3e;
  padding: 20px;
  box-sizing: border-box; /* 确保padding不会影响宽度 */
  height: 100%; /* 使侧边栏高度与页面高度一致 */
  border-radius: 20px;
}

.content {
  flex: 1; /* 让内容区域占据剩余空间 */
  padding: 20px; /* 为内容区域添加适当的内边距 */
  background-color: #ffffff;
  overflow-y: auto;
  box-sizing: border-box; /* 使padding不影响宽度 */
  height: 100%; /* 使内容区域高度与页面高度一致 */
}
</style>
