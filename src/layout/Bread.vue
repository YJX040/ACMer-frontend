<template>
    <el-breadcrumb :separator-icon="ArrowRight" class="bread">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" :to="item.to">
        <!-- 字体放大 -->
        <span style="font-size: 16px;">{{ item.label }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

</template>

<script setup>
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
    rank: '排名',
    problem: '题目',
    train: '训练',
    user: '用户',
    userlist: '用户概览',
    cf: 'Codeforces',
    admin: '管理员',
    cfuser: 'CF用户',
    cfuseradmin: 'CF用户管理',
    useradmin: '用户管理',
  }
  return labels[path] || path
}
</script>

<style scoped>
.bread{
  padding: 20px 0 0 20px;
}
</style>
