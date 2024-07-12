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
              <span>新增题目</span>
            </div>
          </template>
          <el-button type="primary" @click="addQuestion">新增题目</el-button>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span>新增用户</span>
            </div>
          </template>
          <el-button type="primary" @click="addUser">新增用户</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-card>
      <template #header>
        <div class="clearfix">
          <span>每周用户做题数</span>
        </div>
      </template>
      <el-table :data="weeklyUserQuestions">
        <el-table-column prop="week" label="周"></el-table-column>
        <el-table-column prop="questionCount" label="做题数"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import api from '@/api';

const questionCount = ref(0);
const userCount = ref(0);
const weeklyUserQuestions = ref([]);

const fetchData = async () => {
  try {
    const questionRes = await api.getQuestionCount();
    questionCount.value = questionRes.data.count;

    const userRes = await api.getUserCount();
    userCount.value = userRes.data.count;

    const weeklyRes = await api.getWeeklyUserQuestions();
    weeklyUserQuestions.value = weeklyRes.data;
  } catch (error) {
    ElMessage.error('数据获取失败');
  }
};

const addQuestion = () => {
  router.push('/admin/addproblem');
};

const addUser = () => {
  router.push('/admin/adduser');
};

onMounted(fetchData);
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
</style>
