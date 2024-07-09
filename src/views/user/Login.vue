<template>
  <div>
    <div class="login-container">
      <div class="login-box">
        <div class="login-title">登录</div>
        <el-form ref="formRef" :model="form" :rules="rules" :initial-state="initialState">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号">
              <template #prefix>
                <el-icon class="el-input__icon"><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              :type="passwordType" 
              v-model="form.password" 
              placeholder="请输入密码">
              <template #prefix>
                <el-icon class="el-input__icon"><Lock /></el-icon>
              </template>
              <template #suffix>
                <el-icon 
                  class="el-input__icon" 
                  @click="togglePasswordVisibility">
                  <component :is="passwordIcon" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-select style="width: 100%" v-model="form.role">
              <el-option value="ADMIN" label="管理员">
              </el-option>
              <el-option value="STUDENT" label="学生"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-button" @click="handleSubmit">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="register-link">
          还没有账号？请 <router-link to="/register">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { Loginstore } from '@/stores/login'; // 引入 Pinia Store
import { User, Lock, View, Hide } from '@element-plus/icons-vue';

const store = Loginstore(); // 使用 Pinia Store

const formRef = ref();
const form = reactive({
  username: '',
  password: '',
  role: 'ADMIN'
});

const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

const initialState = {
  username: '',
  password: '',
  role: 'ADMIN'
};

const passwordType = ref('password');
const passwordIcon = ref(Hide);

const togglePasswordVisibility = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
    passwordIcon.value = View;
  } else {
    passwordType.value = 'password';
    passwordIcon.value = Hide;
  }
};

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 模拟登录成功，实际项目中请替换为实际的登录请求
      const userData = { username: form.username, role: form.role };
      store.login(); // 调用 Pinia Store 中的登录方法
      localStorage.setItem('isLoggedIn', 'true'); // 将登录状态保存到 localStorage
      ElMessage.success('登录成功');
      router.push('/'); // 跳转到首页
    } else {
      ElMessage.error('请输入正确的账号和密码');
    }
  });
};
</script>

<style scoped>
.login-container {
  min-height: calc(100vh - 60px); /* Adjust height based on the navigation bar */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-image: url(); /* Add a URL or remove if not needed */
  margin-top: 60px; /* Height of the navigation bar */
}

.login-box {
  width: 100%;
  max-width: 350px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 5px;
}

.login-title {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
}

.login-button {
  width: 100%;
}

.register-link {
  margin-top: 30px;
  text-align: right;
}
</style>
