<template>
    <div class="admin-form-container">
      <h2>新增用户</h2>
      <el-form :model="formData" ref="userForm" label-width="80px" class="form" @submit.prevent="submitForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码" clearable></el-input>
        </el-form-item>
        
        <el-form-item label="用户身份" prop="role">
          <el-select v-model="formData.role" placeholder="请选择用户身份">
            <el-option label="普通用户" value="user"></el-option>
            <el-option label="管理员" value="admin"></el-option>
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
  import { ElMessage, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton } from 'element-plus';
  import { useAuthStore } from '@/stores/auth';
  
  const store = useAuthStore();
  const router = useRouter();
  const formData = ref({
    username: '',
    password: '',
    role: 'user'
  });
  
  const submitForm = () => {
    console.log("提交用户信息:", formData.value);
  
    // 模拟提交逻辑
    // 实际应用中需根据具体需求调用 API 或其他服务保存新增用户的数据
  
    // 清空表单数据
    formData.value.username = '';
    formData.value.password = '';
    formData.value.role = 'user'; // 重置用户身份为普通用户
  
    // 提示用户添加成功
    ElMessage.success('用户添加成功');
  
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
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #ffffff;
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
  