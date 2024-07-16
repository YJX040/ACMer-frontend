<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span>题目数量</span>
            </div>
          </template>
          <div>{{ questionCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span>用户数量</span>
            </div>
          </template>
          <div>{{ userCount }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span>数据更新</span>
            </div>
          </template>
          <el-button type="primary" @click="updateData">数据更新</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import adminApi from '@/api/admin';
import userApi from '@/api/user';
import contestApi from '@/api/contest';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
const questionCount = ref(0);
const userCount = ref(0);

const updateData = async () => {
  try {
    await adminApi.updateData();
    ElMessage.success('数据更新成功');
  } catch (error) {
    ElMessage.error('数据更新失败');
  }
};

// 加载数据
const loadData = async () => {
  const params = {
    pageNum: 1,
    pageSize: 10,
  };
  try {
    const responseUser = await userApi.getUserList(params);
    userCount.value = responseUser.data.data.total;
    const responseProblem = await contestApi.listProblem(params);
    questionCount.value = responseProblem.data.data.total;
    // ElMessage.success('获取数据成功');
  } catch (error) {
    ElMessage.error('获取数据失败');
  }
};

onMounted(loadData);
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>
