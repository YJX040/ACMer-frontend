<template>
  <div >
    <el-button @click="toggleCollapse" class="collapse-button">
      <el-icon v-if="isCollapse"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
      {{ isCollapse ? '----->' : '---extend---' }}
    </el-button>
    <el-menu
      default-active="home"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- 主页 -->
      <el-menu-item index="home" @click="goto('/')">
        <el-icon><HomeFilled /></el-icon>
        <template #title>主页</template>
      </el-menu-item>

      <!-- 用户管理 -->
      <el-sub-menu index="user">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="login" @click="goto('/login')">
          <el-icon><Location /></el-icon>
          <span>登录</span>
        </el-menu-item>
        <el-menu-item index="register" @click="goto('/register')">
          <el-icon><Location /></el-icon>
          <span>注册</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- Codeforces -->
      <el-sub-menu index="cf" >
        <template #title>
          <el-icon><Location /></el-icon>
          <span @click="goto('/cf')">Codeforces</span>
        </template>
        <el-menu-item index="contest" @click="goto('/cf/contest')">
          <el-icon><Location /></el-icon>
          <span>比赛</span>
        </el-menu-item>
        <el-menu-item index="cfUser" @click="goto('/cf/user')">
          <el-icon><Location /></el-icon>
          <span>Codeforces 用户</span>
        </el-menu-item>
        <el-menu-item index="rank" @click="goto('/cf/rank')">
          <el-icon><Location /></el-icon>
          <span>排名</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 训练 -->
      <el-menu-item index="train" @click="goto('/train')">
        <el-icon><Location /></el-icon>
        <template #title>训练</template>
      </el-menu-item>

      <!-- 用户 -->
      <el-menu-item index="user" @click="goto('/user')">
        <el-icon><Location /></el-icon>
        <template #title>用户</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Location, HomeFilled } from '@element-plus/icons-vue'

const router = useRouter()
const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

const goto = (path: string) => {
  router.push(path)
}
</script>

<style scoped>

.collapse-button {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
}

.el-menu-vertical-demo {
  width: 100%;
}
</style>
