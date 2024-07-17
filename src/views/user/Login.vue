<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-title">登录</div>
      <el-form ref="formRef" :model="form" :rules="rules" :initial-state="initialState">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号">
            <template #prefix>
              <el-icon class="el-input__icon">
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :type="passwordType" v-model="form.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon class="el-input__icon">
                <Lock />
              </el-icon>
            </template>
            <template #suffix>
              <el-icon class="el-input__icon" @click="togglePasswordVisibility">
                <component :is="passwordIcon" />
              </el-icon>
            </template>
          </el-input>
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
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useAuthStore } from '@/stores/auth'; // 使用 Pinia 的 Auth Store
import { User, Lock, View, Hide } from '@element-plus/icons-vue';
import api from '@/api/user'; // 引入 API 模块
import { md5 } from 'js-md5';

const { setToken } = useAuthStore(); // 使用 Pinia Store

const formRef = ref();
const form = reactive({
  username: '',
  password: '',
});

const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

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

const handleSubmit = async() => {
      const response = await api.login({
        username: form.username,
        password: md5(form.password),
      });
      const token = response.data.data; 
      console.log('token:', token);
      setToken(token); // 设置 token 和解析身份
      ElMessage.success(response.data.message);
      router.push('/'); // 跳转到首页
};

</script>

<style scoped>
.login-container {
  height:100%;
  /* Adjust height based on the navigation bar */
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 20px; */
  background-image: url();
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
