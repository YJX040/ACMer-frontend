<template>
  <div>
    
    <div class="register-container">
      <div style="width:350px" class="register-box">
        <div style="font-weight:bold; font-size:24px; text-align: center; margin-bottom: 30px; ">注册</div>
        <el-form
          :label-position="labelPosition"
          label-width="auto"
          :model="formLabelAlign"
          style="max-width: 600px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="data.form.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="data.form.password" />
          </el-form-item>

          <el-form-item label="姓名">
            <el-input v-model="data.form.name" />
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="data.form.region" />
          </el-form-item>
          <el-form-item label="学校">
            <el-input v-model="data.form.school" />
          </el-form-item>
          

          <el-form-item>
            <el-button type="primary" style="width:100%" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script setup>
import {reactive,ref} from "vue";
//import request from "@/utils/request";
import {ElMessage} from "element-plus";
import router from "@/router";

  const data = reactive({
    form:{}
  })

  const rules = reactive({
    username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
    ],
  })


const labelPosition = 'right'; // 设置默认的label位置

const submitForm = () => {
  // 在这里编写提交表单的逻辑
  // 可以通过 formLabelAlign 对象获取表单数据，并执行相应的提交操作
  
};

</script>

<style scoped>
.register-container{
  min-height:100vh; 
  overflow:hidden; 
  display: flex; 
  align-items:center; 
  justify-content:center;
  background-image: url();
}

.register-box{
  background-color:rgba(255,255,255,.3);
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  padding:30px;
  border-radius: 5px;
}

</style>