<template>
  <el-card class="user-card info-card" >
      <!-- <template v-slot:header>
          <div class="header">
              <h2>{{ userInfo.name }} 的详细信息</h2>
          </div>
          
        </template> -->
        <div class="info-detail">
          <Avatar :avatar="avatar" class="avatar" />
          <div class="info">
            <p><strong>用户名:</strong> {{ userInfo.username }}</p>
            <p><strong>姓名:</strong> {{ userInfo.name }}</p>
              <p><strong>学校:</strong> {{ userInfo.school }}</p>
              <p><strong>班级:</strong> {{ userInfo.clazz }}</p>
              <p><strong>年级:</strong> {{ userInfo.grade }}</p>
          </div>
        </div>
  </el-card>
  <el-card class="user-card">
      <h2>学生整体表现趋势</h2>
      <LineChart :xAxisData="xAxisData" :legendData="legendData" :seriesData="seriesData" />
  </el-card>

  <el-card class="user-card">
      <h2>提交情况</h2>
      <List :columns="columns" :tableData="tableData" :showSearch="true" :showCheckbox="true" />

      <CustomPagination :current-page="currentPage" :total="total" :page-size="pageSize"
          @update:currentPage="handleCurrentChange" />
  </el-card>
</template>

<script setup>
import { ref, onMounted, computed, reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { ElCard } from 'element-plus';
import userApi from '@/api/user';
import LineChart from '@/components/LineChart.vue';
import List from '@/components/List.vue';
import CustomPagination from '@/components/CustomPagination.vue';
import Avatar from '@/components/Avatar.vue';
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const userInfo = reactive({
  name: '',
  school: '',
  clazz: '',
  grade: '',
  username: '',
  history: []
});
const avatar = ref('');
const router = useRouter();
const userId = ref();
const loadUserInfo = async () => {
      const response = await userApi.getUserInfoById(userId.value);
      userInfo.name = response.data.data.name;
      userInfo.school = response.data.data.school;
      userInfo.clazz = response.data.data.clazz;
      userInfo.grade = response.data.data.grade;
      userInfo.username = response.data.data.username;
      const historyResponse = await userApi.getUserRating(userId.value);
      userInfo.history = historyResponse.data.data;
      
};
const xAxisData = computed(() => userInfo.history.map(item => item.contestName));
const seriesData = computed(() => [{
  name: 'Rating',
  type: 'line',
  data: userInfo.history.map(item => item.newRating)
}]);
const legendData = computed(() => ['Rating']);

// 定义表格列
const columns = [
{ prop: 'contestId', label: '比赛ID', sortable: true, columnKey: 'contestId', minwidth: '100px' },
{ prop: 'creationTimeSeconds', label: '创建时间', minwidth: '200px' },
{ prop: 'problemId', label: '题目ID', minwidth: '100px' },
{ prop: 'handle', label: '用户名', minwidth: '150px' },
{ prop: 'participantType', label: '参与类型', minwidth: '150px' },
{ prop: 'programmingLanguage', label: '编程语言', minwidth: '150px' },
{ prop: 'verdict', label: '判定结果', minwidth: '150px' },
{ prop: 'passedTestCount', label: '通过测试数量', minwidth: '150px' },
{ prop: 'accountType', label: '账户类型', minwidth: '100px' }
];

const updateTableData = async () => {
const params = {
  id: userId.value,
  pageNum: currentPage.value,
  pageSize: pageSize.value,
};
console.log('params:', params);
const response = await userApi.getUserSubmissionsById(params);
console.log('responsetable:', response.data.data);
tableData.value = response.data.data.items || [];
total.value = response.data.data.total || 0;
};

watchEffect(() => {
  if (userInfo.name!==''&&userInfo.name!==undefined&&userInfo.name!==null) {
    avatar.value = userInfo.name;
  } else{
    avatar.value = userInfo.username;
  }
  // console.log('avater',avatar.value)
})

// 处理当前页码变化
const handleCurrentChange = (page) => {
currentPage.value = page;
updateTableData();
};

onMounted(() => {
  userId.value = Number(router.currentRoute.value.params.id);
  loadUserInfo();
  updateTableData();
});
</script>

<style scoped>
.user-card {
  margin: 20px auto;
}

.info-card {
  width: 100% !important;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

:deep(.el-card__body) {
  width: 100% !important;
}

.avatar {
  height: 200px;
  width: 200px;
}

.info-detail {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  gap: 50px;
}

.header {
  background-color: #409EFF;
  color: #fff;
  padding: 20px;
  border-radius: 5px 5px 0 0;
}

.info {
  padding: 20px;
  line-height: 35px;
}

.info p {
  margin-bottom: 10px;
}

.info strong {
  font-weight: bold;
  margin-right: 5px;
}
</style>