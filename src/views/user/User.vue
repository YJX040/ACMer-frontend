<template>
  <div class="user-page">
    <el-card class="user-info-card">
      <template v-slot:header>
        <span>个人信息</span>
      </template>
      <div class="CardBody">
        <div class="info-container">
          <div class="avatar-container">
            <img class="avatar" src="../../assets/change.jpg" alt="User Avatar">
          </div>
          <div class="user-info">
            <div class="user-info-item">
              <div class="info-label">用户名:</div>
              <div class="info-value">{{ userInfo.username }}</div>
            </div>
            <div class="user-info-item">
              <div class="info-label">邮箱:</div>
              <div class="info-value">{{ userInfo.email }}</div>
            </div>
            <div class="user-info-item">
              <div class="info-label">积分:</div>
              <div class="info-value">{{ userInfo.points }}</div>
            </div>
            <div class="user-info-item">
              <div class="info-label">注册时间:</div>
              <div class="info-value">{{ userInfo.registeredAt }}</div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="user-history-card">
      <template v-slot:header>
        <span>历史记录</span>
      </template>
      <div class="CardBody">
        <el-table :data="historyData" style="width: 100%">
          <el-table-column prop="action" label="操作" />
          <el-table-column prop="time" label="时间" />
          <el-table-column prop="description" label="描述" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userInfo = ref({
  username: 'John Doe',
  email: 'john.doe@example.com',
  points: 1000,
  registeredAt: '2023-01-01 10:00:00', // 示例注册时间
});

const historyData = ref([
  { action: '登录', time: '2024-07-10 08:00:00', description: '用户登录系统' },
  { action: '提交题解', time: '2024-07-10 09:00:00', description: '提交了题目 #123 的解答' },
  { action: '参加比赛', time: '2024-07-09 14:00:00', description: '参加了Codeforces比赛' },
]);

const router = useRouter();

// 示例的返回方法，实际项目中根据需求修改
const goBack = () => {
  router.go(-1); // 返回上一页
};
</script>

<style scoped>
.user-page {
  padding: 20px;
}

.user-info-card,
.user-history-card {
  margin-bottom: 20px;
}

.info-container {
  display: flex;
  align-items: center;
}

.avatar-container {
  flex: 0 0 100px;
  margin-right: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.user-info {
  flex: 1;
}

.user-info-item {
  display: flex;
  margin-bottom: 10px;
}

.info-label {
  font-weight: bold;
  width: 100px;
}

.info-value {
  flex: 1;
}
</style>
