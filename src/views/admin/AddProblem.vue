<template>
  <div class="admin-form-container">
    <h2>新增题目</h2>
    <el-form :model="formData" ref="questionForm" label-width="80px" class="form" @submit.prevent="submitForm">
      <el-form-item label="题目标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入题目标题" clearable></el-input>
      </el-form-item>

      <el-form-item label="题目描述" prop="description">
        <el-input type="textarea" v-model="formData.description" placeholder="请输入题目描述" clearable></el-input>
      </el-form-item>

      <el-form-item label="难度" prop="difficulty">
        <el-select v-model="formData.difficulty" placeholder="请选择题目难度">
          <el-option label="简单" value="easy"></el-option>
          <el-option label="中等" value="medium"></el-option>
          <el-option label="困难" value="hard"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="form-actions">
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton } from 'element-plus'; // 导入 Element Plus 组件
import { useAuthStore } from '@/stores/auth';

const store = useAuthStore();
const router = useRouter();
const formData = ref({
  title: '',
  description: '',
  difficulty: 'easy' // 默认难度为简单
});

const submitForm = () => {
  console.log("提交题目信息:", formData.value);

  // 模拟提交逻辑，实际应用中需根据具体需求调用 API 或其他服务保存新增题目的数据

  // 清空表单数据
  formData.value.title = '';
  formData.value.description = '';
  formData.value.difficulty = 'easy';

  // 提示用户添加成功
  ElMessage.success('题目添加成功');

  // 如果有需要，跳转到其他页面
  // router.push('/admin');
};

// 权限验证
if (!store.token || store.auth !== store.IDENTIFICATION.ADMIN) {
  router.push('/login');
}
</script>

<style scoped>
.admin-form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form {
  width: 100%;
}

.form-actions {
  text-align: center;
  margin-top: 20px;
}

.el-button {
  width: 100%;
}
</style>
