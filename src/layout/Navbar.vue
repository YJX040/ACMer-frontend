<template>
    <div class="container">
      <aside class="sidebar">
        <Collapse :isCollapse="isCollapse" @open="handleOpen" @close="handleClose"></Collapse>
      </aside>
      <main class="main-content">
        <header class="breadcrumb">
          <Bread></Bread>
        </header>
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Bread from '../components/Bread.vue'
  import Collapse from '../components/Collapse.vue'
  const isCollapse = ref(false)
  
  const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  
  const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    height: 100vh; /* 使容器填满整个视窗高度 */
  }
  
  .sidebar {
    padding: 20px; /* 内边距 */
  }
  
  .main-content {
    flex: 1; /* 主内容区域自适应宽度 */
    padding: 20px; /* 内容区域内边距 */
  }
  
  .breadcrumb {
    padding: 10px;
  }
  
  .el-icon {
    font-size: 18px; /* 调整图标大小 */
    margin-right: 10px; /* 可选：调整图标与文字之间的间距 */
  }
  </style>
  