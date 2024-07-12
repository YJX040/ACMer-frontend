<template>
  <div>
    <div class="register-container">
      <div class="register-box">
        <div class="register-title">注册</div>
        <el-form ref="formRef" :model="data.form" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="data.form.username" placeholder="请输入账号">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :type="passwordType" v-model="data.form.password" placeholder="请输入密码">
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
          <el-form-item prop="confirmPassword">
            <el-input :type="passwordType" v-model="data.form.confirmPassword" placeholder="请确认密码">
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
            <el-button type="primary" class="register-button" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
        <div class="login-link">
          已有账号？请 <router-link to="/login">登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import router from "@/router";
import { User, Lock, View, Hide } from '@element-plus/icons-vue';
import api from "@/api";
import { useAuthStore } from "@/stores/auth";
import { md5 } from 'js-md5'; 
const authStore = useAuthStore();
const data = reactive({
  form: {
    username: "",
    password: "",
    confirmPassword: "",
  }
});

const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  email: [{ required: true, message: '请输入电子邮件', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' }],
});

const formRef = ref();

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

const register = async() => {
      if (data.form.password !== data.form.confirmPassword) {
        ElMessage.error('两次输入的密码不一致');
        return;
      }
      const res = await api.register({
        username: data.form.username,
        password: md5(data.form.password),
        rePassword: md5(data.form.confirmPassword),
      });
      ElMessage.success(res.data.message);
      authStore.setToken(res.data.data);
      router.push('/');
};
</script>

<style scoped>
.register-container {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 60px;
}

.register-box {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  border-radius: 8px;
}

.register-title {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
}

.register-button {
  width: 100%;
}

.login-link {
  margin-top: 20px;
  text-align: right;
}
</style>
