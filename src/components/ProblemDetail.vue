<template>
    <div>
      <el-table :data="problemSet" style="width: 100%" @row-click="handleRowClick">
        <el-table-column label="题目索引">
          <template #default="{ $index }">
            {{ String.fromCharCode(65 + $index) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="题目名称" />
        <el-table-column prop="rating" label="难度等级">
          <template #default="{ row }">
            <el-tag type="info">{{ row.rating }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签">
          <template #default="{ row }">
            <el-tag v-for="(tag, index) in row.tags.split(';').filter(tag => tag)" :key="index" type="success">{{ tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="points" label="分数" />
      </el-table>
      <el-button @click="goBack">返回</el-button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  
  const authStore = useAuthStore();
  const route = useRoute();
  const router = useRouter();
  const problemSet = ref([]);
  
  onMounted(() => {
    const problemId = parseInt(route.params.id) - 1; // 获取路由参数中的题目索引，需要转换为整数
    console.log('problemId:', problemId);
  
    // 从 authStore 中获取整个题目集数据
    const allProblemSets = authStore.getProblemSets;
    console.log('All problem sets:', allProblemSets);
  
    // 检查问题索引是否有效
    if (problemId >= 0 && problemId < allProblemSets.length) {
      const selectedProblemSet = allProblemSets[problemId];
      console.log('Selected problem set:', selectedProblemSet);
      problemSet.value = selectedProblemSet.problems; // 更新问题集数据到 problemSet
    } else {
      console.error('Invalid problem index:', problemId);
      // 可以添加错误处理逻辑，例如跳转到一个错误页面或者提示用户
    }
  });
  
  // 处理行点击事件，打开外部链接
  const handleRowClick = (row) => {
    const url = `https://codeforces.com/contest/${row.contestId}/problem/${row.index}`;
    window.open(url, '_blank');
  };
  
  // 返回到列表页
  const goBack = () => {
    router.push('/train');
  };
  </script>
  
  <style scoped>
  /* 添加必要的样式 */
  </style>
  