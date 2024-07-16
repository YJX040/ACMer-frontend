<template>
  <div class="user-page">
    <el-card class="user-info-card">
      <template v-slot:header>
        <span>个人信息</span>
      </template>
      <div class="CardBody">
        <div class="info-container">
          <div class="basic-info-section">
            <!-- 用户基本信息 -->
            <div class="user-info-item">
              <div class="info-label">用户名:</div>
              <div class="info-value">
                <span v-if="!isEditing">{{ userInfo.username }}</span>
                <el-input v-else v-model="userInfo.username" :disabled="!isEditing" size="small"
                  class="no-border-input" />
              </div>
            </div>
            <div class="user-info-item">
              <div class="info-label">真实姓名:</div>
              <div class="info-value">
                <span v-if="!isEditing">{{ userInfo.name }}</span>
                <el-input v-else v-model="userInfo.name" :disabled="!isEditing" size="small" class="no-border-input" />
              </div>
            </div>
            <div class="user-info-item">
              <div class="info-label">学校:</div>
              <div class="info-value">
                <span v-if="!isEditing">{{ userInfo.school }}</span>
                <el-input v-else v-model="userInfo.school" :disabled="!isEditing" size="small"
                  class="no-border-input" />
              </div>
            </div>
            <div class="user-info-item">
              <div class="info-label">班级:</div>
              <div class="info-value">
                <span v-if="!isEditing">{{ userInfo.clazz }}</span>
                <el-input v-else v-model="userInfo.clazz" :disabled="!isEditing" size="small" class="no-border-input" />
              </div>
            </div>
            <!-- 奖项信息 -->
            <div class="user-info-item">
              <div class="info-label">奖项:</div>
              <div class="info-value">
                <span v-if="!isEditing">{{ userInfo.award }}</span>
                <el-input v-else v-model="userInfo.award" :disabled="!isEditing" size="small" class="no-border-input" />
              </div>
            </div>
            <div class="user-info-item">
              <div class="info-label">年级:</div>
              <div class="info-value">
                <span v-if="!isEditing">{{ userInfo.grade }}</span>
                <el-input v-else v-model="userInfo.grade" :disabled="!isEditing" size="small" class="no-border-input" />
              </div>
            </div>
            <div class="user-info-item">
              <div class="info-label">积分:</div>
              <div class="info-value">
                <span>{{ userInfo.cfRanking }}</span>
              </div>
            </div>
            <!-- 修改密码 -->
            <div class="user-info-item" v-if="isCoding">
              <div class="info-label">修改密码:</div>
              <div class="info-value">
                <el-input :type="passwordType" v-model="userInfo.password" size="small" class="no-border-input">
                  <template #suffix>
                    <el-icon class="el-input__icon" @click="togglePasswordVisibility">
                      <component :is="passwordIcon" />
                    </el-icon>
                  </template>
                </el-input>
              </div>
            </div>
            <div class="user-info-item" v-if="isCoding">
              <div class="info-label">确认密码:</div>
              <div class="info-value">
                <el-input :type="confirmPasswordType" v-model="userInfo.rePassword" size="small"
                  class="no-border-input">
                  <template #suffix>
                    <el-icon class="el-input__icon" @click="toggleConfirmPasswordVisibility">
                      <component :is="confirmPasswordIcon" />
                    </el-icon>
                  </template>
                </el-input>
              </div>
            </div>
            <div class="button-section">
              <!-- <el-button v-show="isEditing" @click="addSubAccount">添加子账号</el-button> -->
              <el-button v-show="!isEditing" @click="isEditing = true">修改信息</el-button>
              <el-button v-show="isEditing" type="primary" @click="saveAll">保存</el-button>
              <el-button v-show="!isCoding" @click="isCoding = true">修改密码</el-button>
              <el-button v-show="isCoding" type="primary" @click="changeCode">保存密码</el-button>
              <el-button v-show="isCoding" @click="isCoding = false">取消修改密码</el-button>
            </div>
          </div>
          <div class="account-section">
            <AccountSection :account="userInfo.cfAccount"
              @add:account="addCfSubAccount" 
              @remove:account="deleteSubAccount" 
              @set:main="setMainAccount"
               />
          </div>
        </div>
      </div>
    </el-card>

    <!-- <el-card class="user-history-card">
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
    </el-card> -->

    <el-card class="user-history-card">
      <h2>学生整体表现趋势</h2>
       <LineChart
      :xAxisData="['Week 1', 'Week 2', 'Week 3', 'Week 4']"
      :legendData="['总提交数', '总通过数', '平均通过率']"
      :seriesData="[
        { name: '总提交数', type: 'line', data: [0, 120, 150, 130] },
        { name: '总通过数', type: 'line', data: [70, 90, 110, 100] },
        { name: '平均通过率', type: 'line', yAxisIndex: 1, data: [70, 75, 73, 77] }
      ]"
    />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import userApi from '@/api/user';
import AccountSection from '@/views/user/ShowAccount.vue';
import { ElMessage } from 'element-plus';
import { md5 } from 'js-md5';
import { View, Hide } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import LineChart from '@/components/LineChart.vue';

const userInfo = reactive({
  id: 0,
  username: '',
  name: '',
  school: '',
  clazz: '',
  grade: '',
  award: '',
  password: '',
  rePassword: '',
  cfRanking: 0,
  cfAccount: {
    mainAccount: { handle: '' },
    subAccount: [],
  },
});

const historyData = reactive([
  { action: '登录', time: '2024-07-10 08:00:00', description: '用户登录系统' },
  { action: '提交题解', time: '2024-07-10 09:00:00', description: '提交了题目 #123 的解答' },
  { action: '参加比赛', time: '2024-07-09 14:00:00', description: '参加了Codeforces比赛' },
]);

const isEditing = ref(false);
const isCoding = ref(false);

const passwordType = ref('password');
const passwordIcon = ref(Hide);

const confirmPasswordType = ref('password');
const confirmPasswordIcon = ref(Hide);

const togglePasswordVisibility = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
    passwordIcon.value = View;
  } else {
    passwordType.value = 'password';
    passwordIcon.value = Hide;
  }
};
const toggleConfirmPasswordVisibility = () => {
  if (confirmPasswordType.value === 'password') {
    confirmPasswordType.value = 'text';
    confirmPasswordIcon.value = View;
  } else {
    confirmPasswordType.value = 'password';
    confirmPasswordIcon.value = Hide;
  }
};

const saveAll = async () => {
  isEditing.value = false;
  // 判断密码是否一致
  const response = await userApi.changeUserInfo({
    username: userInfo.username,
    name: userInfo.name,
    school: userInfo.school,
    clazz: userInfo.clazz,
    grade: userInfo.grade,
    award: userInfo.award,
  });
  ElMessage.success('保存成功');
};

const changeCode = async () => {
  if (userInfo.password !== userInfo.rePassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }
  const response = await userApi.changeUserInfo({
    username: userInfo.username,
    name: userInfo.name,
    school: userInfo.school,
    clazz: userInfo.clazz,
    grade: userInfo.grade,
    award: userInfo.award,
    password: md5(md5(userInfo.password)),
  });
  // console.log('修改密码响应:', response.data);
  ElMessage.success('修改密码成功');
  isCoding.value = false;
};

const setMainAccount = async () => {
  // console.log('Set main account:', userInfo.cfAccount.mainAccount.handle);
  const response = await userApi.setMainAccount({
    handle: userInfo.cfAccount.mainAccount.username,
  });
  ElMessage.success(response.data.message);
};

const addCfSubAccount = async (account) => {
  // console.log('Add sub account:', account.handle);
  const response = await userApi.addSubAccount({
    handle: account,
  });
  ElMessage.success(response.data.message);
  //重新刷新
  updateInfo();
};

// const saveSubAccount = (account) => {
//   addCfSubAccount(account);
// };

const delSub = async (account) => {
  console.log('Delete sub account:', account.handle);
  const response = await userApi.deleteSubAccount({
    cfUsername: account.handle,
  });
  ElMessage.success(response.data.message);
};

const deleteSubAccount = (account) => {
  delSub(account);
  userInfo.cfAccount.subAccount = userInfo.cfAccount.subAccount.filter(acc => acc !== account);
};

// const addSubAccount = () => {
//   userInfo.cfAccount.subAccount.push({ handle: '' });
// };

const updateInfo = async () => {
  try {
    const response = await userApi.getUserInfo();
    const data = response.data.data;
    userInfo.id = data.id;
    userInfo.username = data.username;
    userInfo.name = data.name;
    userInfo.school = data.school;
    userInfo.clazz = data.clazz;
    userInfo.grade = data.grade;
    userInfo.award = data.award; // 更新奖项信息
    userInfo.cfAccount.mainAccount.handle = data.cfAccount.mainAccount.handle || '';
    userInfo.cfAccount.subAccount = data.cfAccount.subAccount || [];
    userInfo.password = '';
    userInfo.cfRanking = data.cfRanking;
    console.log('User info:', userInfo);
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

onMounted(() => {
  updateInfo();
});
</script>

<style scoped>
.user-page {
  display: flex;
  flex-direction: column;
  padding: 20px;
  min-height: 100vh;
  align-items: center;
}

.user-info-card,
.user-history-card {
  width: 100%;
  max-width: 1000px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.info-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.basic-info-section,
.account-section {
  width: 50%;
}

.user-info-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.info-label {
  font-weight: bold;
  width: 100px;
}

.sub-account-section {
  margin-top: 20px;
}

.sub-accounts {
  max-height: 250px;
  overflow-y: auto;
}

.sub-account-card {
  margin-bottom: 10px;
}

.sub-account-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.sub-account-label {
  font-weight: bold;
  width: 120px;
}

.sub-account-value {
  flex: 1;
}

.sub-account-actions {
  display: flex;
  justify-content: space-between;
}

.button-section {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.el-button {
  margin-left: 10px;
}

.el-card__header {
  font-size: 18px;
  font-weight: bold;
}

.el-table th {
  font-weight: bold;
}

.el-table td,
.el-table th {
  text-align: center;
}

.el-table-column {
  padding: 12px 0;
}
</style>
