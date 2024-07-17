<template>
  <el-container class="container">
    <el-aside :width="sidebarWidth" class="sidebar">
      <Navbar @collapse="handleCollapse"></Navbar>
    </el-aside>
    <el-container class="right">
      <div style="width:100%">
        <el-header>
          <Bread></Bread>
        </el-header>
        <el-main class="main">
          <RouterView></RouterView>
        </el-main>
      </div>

    </el-container>
  </el-container>
</template>

<script setup>
import Navbar from '@/layout/Navbar.vue'
import Bread from '@/layout/Bread.vue'
import { RouterView } from 'vue-router'
import { ref, computed } from 'vue'

const isCollapsed = ref(false)

const handleCollapse = (collapse) => {
  isCollapsed.value = collapse
}

const sidebarWidth = computed(() => (isCollapsed.value ? '60px' : '200px'))
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
}

.sidebar {
  height: 100vh !important;
  transition: width 0.3s;
  overflow-x: hidden;
}

.header {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(110, 109, 109, 0.1);
}

.main-content {
  flex: 1;
  padding: 20px;
}

.main {
  height: calc(100% - 60px);
}

.breadcrumb {
  padding: 10px;
}

.el-icon {
  font-size: 18px;
  margin-right: 10px;
}

.right {
  height: 100vh;
  width: 100%;
  overflow-y: scroll !important;
}
</style>