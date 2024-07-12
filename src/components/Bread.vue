<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" :to="item.to">
      {{ item.label }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute()

const breadcrumbItems = computed(() => {
  const pathArray = route.path.split('/').filter(path => path)
  const breadcrumbArray = pathArray.map((path, index) => {
    return {
      label: getBreadcrumbLabel(path),
      to: '/' + pathArray.slice(0, index + 1).join('/')
    }
  })
  breadcrumbArray.unshift({ label: '主页', to: '/' })
  return breadcrumbArray
})

const getBreadcrumbLabel = (path) => {
  const labels = {
    login: '登录',
    register: '注册',
    contest: '比赛',
    'cf/user': 'Codeforces 用户',
    'cf/rank': '排名',
    train: '训练',
    user: '用户'
  }
  return labels[path] || path
}
</script>

<style scoped>
</style>
