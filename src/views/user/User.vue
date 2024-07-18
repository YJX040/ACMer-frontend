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
          </div>
          <div class="account-section">
            <AccountSection :account="userInfo.cfAccount" @add:account="addCfSubAccount"
              @remove:account="deleteSubAccount" @set:main="setMainAccount" />
          </div>
        </div>
        <div class="button-section">
          <el-button v-show="!isEditing" @click="isEditing = true">修改信息</el-button>
          <el-button v-show="isEditing" type="primary" @click="saveAll">保存</el-button>
          <el-button v-show="isEditing" @click="isEditing = false">取消</el-button>
          <el-button v-show="!isCoding" @click="isCoding = true">修改密码</el-button>
          <el-button v-show="isCoding" type="primary" @click="changeCode">保存密码</el-button>
          <el-button v-show="isCoding" @click="isCoding = false">取消修改密码</el-button>
        </div>
      </div>
    </el-card>

    <el-card class="user-history-card">
      <h2>整体表现趋势</h2>
      <LineChart :xAxisData="xAxisData" :legendData="legendData" :seriesData="seriesData" />
    </el-card>

    <el-card class="user-history-card">
      <h2>提交情况</h2>
      <List :columns="columns" :tableData="tableData" :showSearch="true" :showCheckbox="true" />

      <CustomPagination :current-page="currentPage" :total="total" :page-size="pageSize"
        @update:currentPage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import userApi from '@/api/user';
import AccountSection from '@/views/user/ShowAccount.vue';
import { ElMessage } from 'element-plus';
import { md5 } from 'js-md5';
import { View, Hide } from '@element-plus/icons-vue';
import LineChart from '@/components/LineChart.vue';
import List from '@/components/List.vue';
import CustomPagination from '@/components/CustomPagination.vue';

// 定义表格列
const columns = [
  { prop: 'contestId', label: '比赛ID', sortable: true, columnKey: 'contestId', width: '100px' },
  { prop: 'creationTimeSeconds', label: '提交时间', minwidth: '120px' },
  { prop: 'problemId', label: '题目ID', minwidth: '80px' },
  { prop: 'handle', label: '提交账户', minwidth: '80px' },
  { prop: 'accountType', label: '账户类型', minwidth: '80px' },
  { prop: 'participantType', label: '参与类型', minwidth: '80px' },
  { prop: 'programmingLanguage', label: '编程语言', minwidth: '140px' },
  { prop: 'verdict', label: '判定结果', minwidth: '150px' },
  // { prop: 'passedTestCount', label: '通过数', width: '80px' },
];

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
  history: [] 
});

const isEditing = ref(false);
const isCoding = ref(false);
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
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
  }else if(userInfo.password===''||userInfo.rePassword===''){
    ElMessage.error('密码为空')
    return ;
  }else if(userInfo.password.length < 6){
    ElMessage.error('密码长度不能小于6位');
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
  ElMessage.success('修改密码成功');
  isCoding.value = false;
};

const setMainAccount = (handle) => {
  ElMessageBox.confirm(`确定要设置为主账号吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () =>{
      const response = await userApi.setMainAccount({
      handle,
    });
    ElMessage.success(response.data.message);
    updateInfo();
  }).catch(() => {
    // 用户取消，不进行任何操作
  });
};

const addCfSubAccount = async (account) => {
  const handle = account.trim();
  const response = await userApi.addSubAccount({
    handle,
  });
  ElMessage.success(response.data.message);
  //重新刷新
  updateInfo();
};

const delSub = async (account) => {
  const response = await userApi.deleteSubAccount({
    cfUsername: account,
  });
  updateInfo();
  ElMessage.success(response.data.message);
};

const deleteSubAccount = (account) => {
  console.log('account:', account);
  delSub(account);
  userInfo.cfAccount.subAccount = userInfo.cfAccount.subAccount.filter(acc => acc !== account);
};

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
    const responseRating = await userApi.getRating();
    console.log('responseRating:', responseRating.data.data);
    userInfo.history = responseRating.data.data || []; // 更新用户的历史数据
  } catch (error) {
    // console.error('Error fetching user info:', error);
  }
};
const updateTableData = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
  const response = await userApi.getUserSubmissions(params);
  console.log('responsetable:', response.data.data);
  tableData.value = response.data.data.items || [];
  total.value = response.data.data.total || 0;
};

onMounted(() => {
  updateInfo();
  updateTableData();
});

// const xAxisData = computed(() => userInfo.history.map(item => new Date(item.ratingUpdateTimeSeconds * 1000).toLocaleDateString()));
const xAxisData = computed(() => userInfo.history.map(item => item.contestName));
const seriesData = computed(() => [{
  name: 'Rating',
  type: 'line',
  data: userInfo.history.map(item => item.newRating)
}]);
const legendData = computed(() => ['Rating']);

// 处理当前页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  updateTableData();
};

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
  /* max-width: 1000px; */

  margin-bottom: 20px;
  border-radius: 8px;
}

.info-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 40px;
}

.basic-info-section,
.account-section {
  width: 40%;
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

.button-section {

  display: flex;
  justify-content: center;
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

.user-history-card {
  overflow-x: auto;
}
</style>
