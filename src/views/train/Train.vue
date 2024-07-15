<template>
  <div>
    <!-- 输入参数生成题目 -->
    <el-input v-model="problemSetsCount" type="number" placeholder="生成题目的套数" />
    <el-button type="primary" @click="generateProblemSets">生成题目</el-button>

    <!-- 题目集列表 -->
    <el-table :data="authStore.getProblemSets" style="width: 100%" @row-click="showProblemDetails">
      <el-table-column prop="index" label="问题索引" />
      <!-- A 到 J 的表头列 -->
      <el-table-column v-for="(column, index) in columns" :key="index" :label="column.label">
        <template #default="{ row }">
          <div class="cell-content">{{ row.problems[index]?.name }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import trainApi from '@/api/train';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const problemSetsCount = ref();
const authStore = useAuthStore();
const router = useRouter();

// A-J 列表头
const columns = [
  { label: 'A' },
  { label: 'B' },
  { label: 'C' },
  { label: 'D' },
  { label: 'E' },
  { label: 'F' },
  { label: 'G' },
  { label: 'H' },
  { label: 'I' },
  { label: 'J' }
];

// 生成题目集
const generateProblemSets = async () => {
  try {
    if (!problemSetsCount.value) {
      ElMessage.warning('请输入生成题目的套数');
      return;
    }
    const response = await trainApi.trainList({
      setNum: problemSetsCount.value
    });
    if (response.data.code === 20021) {
      const data = response.data.data.map((set, index) => ({
        index: index + 1,
        problems: set.problems
      }));
      authStore.setProblemSets(data); // 更新题目集数据
      ElMessage.success(response.data.message);
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    ElMessage.error('获取数据失败');
  }
};

// 显示题目详情
const showProblemDetails = (row) => {
  console.log('row:', row);
  router.push(`/train/problem${row.index}`);
};
</script>

<style scoped>
.cell-content {
  max-height: 60px; /* 设置最大高度 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
  white-space: nowrap; /* 不换行 */
}
</style>
