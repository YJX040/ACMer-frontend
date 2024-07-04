<template>
  <div>
    <div class="login-container">
      <div class="login-box">
        <div class="login-title">登录</div>
        <el-form ref="formRef" :model="data.form" :rules="rules">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" v-model="data.form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input show-password prefix-icon="el-icon-lock" v-model="data.form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-button" @click="login">登 录</el-button>
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
import { reactive, ref } from "vue";
import request from "@/utils/request";
import { ElMessage } from "element-plus";
import router from "@/router";

const data = reactive({
  form: {
    username: "",
    password: ""
  }
});

const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const formRef = ref();

const login = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      request.post('/login', data.form).then(res => {
        if (res.code === '200') {
          localStorage.setItem('student-user', JSON.stringify(res.data));
          ElMessage.success('登录成功');
          router.push('/home'); //跳转主页
        } else {
          ElMessage.error(res.msg);
        }
      });
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
