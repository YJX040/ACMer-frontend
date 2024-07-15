<template>
    <div class="question-management">
      <el-card>
        <template #header>
          <div class="clearfix">
            <span>题目管理</span>
            <el-button type="primary" @click="addQuestion" class="float-right">新增题目</el-button>
          </div>
        </template>
        <List :columns="columns" :tableData="questions" />
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import router from '@/router';
  import api from '@/api/user';
  import List from '@/components/List.vue';
  
  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'title', label: '题目' },
    { prop: 'difficulty', label: '难度' },
    {
      prop: 'actions',
      label: '操作',
      slot: 'actionSlot'
    }
  ];
  
  const questions = ref([]);
  
  const fetchQuestions = async () => {
    try {
      const res = await api.getQuestions();
      questions.value = res.data;
    } catch (error) {
      ElMessage.error('题目数据获取失败');
    }
  };
  
  const addQuestion = () => {
    router.push('/admin/addproblem');
  };
  
  const editQuestion = (question) => {
    router.push({ path: '/questions/edit', query: { id: question.id } });
  };
  
  const deleteQuestion = async (question) => {
    try {
      await api.deleteQuestion(question.id);
      ElMessage.success('题目删除成功');
      fetchQuestions();
    } catch (error) {
      ElMessage.error('题目删除失败');
    }
  };
  
  onMounted(fetchQuestions);
  </script>
  
  <style scoped>
  .question-management {
    padding: 20px;
  }
  .float-right {
    float: right;
  }
  </style>
  