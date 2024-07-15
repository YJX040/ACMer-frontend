<template>
    <el-input v-model="searchClass" style="width: 200px" placeholder="查询班级" />
    <el-button type="primary" @click="searchData('class')" style="margin:0 10px">查询</el-button>
    <el-input v-model="searchName" style="width: 200px" placeholder="查询姓名" />
    <el-button type="primary" @click="searchData('name')" style="margin:0 10px">查询</el-button>
    <el-input v-model="searchUsername" style="width: 200px" placeholder="查询用户名" />
    <el-button type="primary" @click="searchData('username')" style="margin:0 10px">查询</el-button>
  
    <List :columns="columns" :tableData="tableData" :showSearch="true" :showCheckbox="true" @row-click="handleRowClick"/>
    <CustomPagination
      :current-page="currentPage"
      :total="total"
      :page-size="pageSize"
      @update:currentPage="handleCurrentChange"
      @update:pageSize="handleSizeChange" 
    />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import List from '@/components/List.vue';
import userApi from '@/api/user';
import CustomPagination from '@/components/CustomPagination.vue';
import { useAuthStore } from '@/stores/auth';


// 状态管理
const authStore = useAuthStore();
const searchClass = ref('');
const searchName = ref('');
const searchUsername = ref('');
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 路由实例
const router = useRouter();

// 加载数据
const loadData = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
  try {
    const response = await userApi.getUserList(params);
    tableData.value = response.data.data.items;
    total.value = response.data.total;
    // ElMessage.success('获取数据成功');
  } catch (error) {
    ElMessage.error('获取数据失败');
  }
};

// 监听分页变化
watch([currentPage, pageSize], loadData);

// 初始化加载
loadData();

// 列定义
const columns = [
  { prop: 'school', label: '学校' },
  { prop: 'clazz', label: '班级' },
  { prop: 'grade', label: '年级' },
  { prop: 'name', label: '真实姓名' },
  { prop: 'username', label: '用户名' },
  { prop: 'cfRanking', label: 'CF 排名', sortable: true },
];

// 查询数据
const searchData = async (type) => {
  try {
    let response;
    switch (type) {
      case 'class':
        response = await userApi.searchByClass(searchClass.value);
        break;
      case 'name':
        response = await userApi.searchByName(searchName.value);
        break;
      case 'username':
        response = await userApi.searchByUsername(searchUsername.value);
        break;
      default:
        return;
    }
    tableData.value = response.data.data;
    total.value = response.data.total;
    authStore.setProblemCount(response.data.total);
    ElMessage.success('查询成功');
  } catch (error) {
    ElMessage.error('查询失败');
  }
};

// 处理行点击事件
const handleRowClick = (row) => {
  if (row && row.id !== undefined && row.id !== null) {
    // 导航到用户详细信息页面，并传递用户ID作为路由参数
    router.push({ path: `/user/${row.id}` }); // 跳转到用户详情页面
  } else {
    console.error('无效的用户ID:', row.id);
    // 或者在此处添加适当的错误处理逻辑，例如提示用户或者记录错误信息
  }
};


// 处理分页大小变化
const handleSizeChange = (pageSize) => {
  currentPage.value = 1; // 重置当前页码
  pageSize.value = pageSize;
};

// 处理当前页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
};

</script>
