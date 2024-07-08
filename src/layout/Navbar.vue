<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">用户列表</el-menu-item>
    <el-sub-menu index="3">
      <template #title>codeforces</template>
      <el-menu-item index="3-1">比赛列表</el-menu-item>
      <el-menu-item index="3-2">账户排名</el-menu-item>
      <el-menu-item index="3-3">题目列表</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4">智能训练</el-menu-item>
    <el-menu-item index="5">登录</el-menu-item>
    <el-menu-item index="6">注册</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const activeIndex = ref('1')
const router = useRouter()

const handleSelect = (key: string, keyPath: string[]) => {
  switch (key) {
    case '1':
      router.push('/')
      break
    case '2':
      router.push('/user')
      break
    case '3-1':
      router.push('/cf/contest')
      break
    case '3-2':
      router.push('/cf/rank')
      break
    case '3-3':
      router.push('/cf/user')
      break
    case '4':
      router.push('/recommendations')
      break
    case '5':
      router.push('/login')
      break
    case '6':
      router.push('/register')
      break
    default:
      break
  }
}
</script>

<style scoped>
.el-menu-demo {
  background-color: #ffffff;
  color: #000;
}

.el-menu-demo .el-menu-item {
  cursor: pointer;
}

.el-menu-demo .el-menu-item .router-link-exact-active {
  color: #ffd04b;
}
</style>
