<template>
  <el-card class="user-card" shadow="hover">
    <template v-slot:header>
      <div class="header">
      <h2>{{ userInfo.name }} 的详细信息</h2>
    </div>
    <div class="info">
      <p><strong>学校:</strong> {{ userInfo.school }}</p>
      <p><strong>班级:</strong> {{ userInfo.clazz }}</p>
      <p><strong>年级:</strong> {{ userInfo.grade }}</p>
      <p><strong>用户名:</strong> {{ userInfo.username }}</p>
    </div>
    </template> <!-- Add the closing tag for the template element -->
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElCard } from 'element-plus';
import userApi from '@/api/user';

const userInfo = ref({
  name: '',
  school: '',
  clazz: '',
  grade: '',
  username: ''
});
const router = useRouter();
const userId = ref();

const loadUserInfo = async () => {
  try {
    const response = await userApi.getUserInfoById(userId.value);
    userInfo.value = response.data.data;
  } catch (error) {
    console.error('获取用户信息失败', error);
  }
};

onMounted(() => {
  userId.value = Number(router.currentRoute.value.params.id);
  loadUserInfo();
});
</script>

<style scoped>
.user-card {
  max-width: 600px;
  margin: 20px auto;
}

.header {
  background-color: #409EFF;
  color: #fff;
  padding: 20px;
  border-radius: 5px 5px 0 0;
}

.info {
  padding: 20px;
}

.info p {
  margin-bottom: 10px;
}

.info strong {
  font-weight: bold;
  margin-right: 5px;
}
</style>
