<template>
  <el-row :gutter="16">
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="questionCount">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              题目数量
              <el-tooltip effect="dark" content="Number of users who logged into the product in one day"
                placement="top">
                <el-icon style="margin-left: 4px" :size="12">
                  <Warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="userCount">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              用户数量
              <el-tooltip effect="dark" content="Number of users who logged into the product in one month"
                placement="top">
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card">
        <el-statistic :value="cfUserCount" title="New transactions today">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              CF账户数
            </div>
          </template>
        </el-statistic>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="statistic-card update-card">
        <div class="line line-title">
          数据更新
        </div>
        <div class="line">
          <el-button class="countdown-footer" type="primary" @click="updateData">
            更新
          </el-button>
          <div style="flex-grow: 1;">
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-card class="nav-card">
    <template v-slot:header>
      <span>管理导航</span>
    </template>
    <div class="nav-links">
      <el-button type="primary" @click="navigateTo('/admin/useradmin')">用户管理</el-button>
      <el-button type="success" @click="navigateTo('/admin/cfuseradmin')">CF管理</el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import adminApi from '@/api/admin';
import userApi from '@/api/user';
import contestApi from '@/api/contest';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const questionCount = ref(0);
const userCount = ref(0);
const cfUserCount = ref(0);

const navigateTo = (path) => {
  router.push(path);
};

const updateData = async () => {
  // try {
  //   await adminApi.updateData();
  //   ElMessage.success('数据更新成功');
  //   // 更新数据成功后重新加载数据
  //   loadData();
  // } catch (error) {
  //   ElMessage.error('数据更新失败');
  // }
  ElMessage.success('更新请求已发送');
  await adminApi.updateData();

};

// 加载数据
const loadData = async () => {
  const params = {
    pageNum: 1,
    pageSize: 10,
  };
  try {
    const responseUser = await userApi.getUserList(params);
    userCount.value = responseUser.data.data.total;
    const responseProblem = await contestApi.listProblem(params);
    questionCount.value = responseProblem.data.data.total;
    const responseCFUser = await adminApi.getCFList(params);
    cfUserCount.value = responseCFUser.data.data.total;
  } catch (error) {
  }
};

onMounted(loadData);
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.dashboard-row {
  display: flex;
  justify-content: space-between;
}

.dashboard-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-content {
  flex: 1;
  /* 占据剩余空间 */
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  text-align: center;
  /* 文本居中 */
}

.nav-card {
  text-align: center;
  margin-top: 30px;
}

.update-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.line-title{
  font-size: 12px;
  font-weight: 400;
  color: #606266;
  margin-bottom: 10px;
}
</style>
