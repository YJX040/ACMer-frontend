<template>
  <List :columns="columns" :tableData="tableData" :showSearch="true" :showCheckbox="true" @row-click="handleRowClick" />

  <CustomPagination :current-page="currentPage" :total="total" :page-size="pageSize"
    @update:currentPage="handleCurrentChange" />

</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import List from '@/components/List.vue';
import userApi from '@/api/user';
import CustomPagination from '@/components/CustomPagination.vue';

const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(15);
const total = ref(0);

// 路由实例
const router = useRouter();

const eachObj = {
  id: -1,
  school: '',
  clazz: '',
  grade: '',
  name: '',
  username: '',
  cfRanking: '',
}

// 加载数据
const loadData = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
  try {
    const response = await userApi.getUserList(params);
    const rawData = response.data.data.items;
    console.log('rawData:', rawData);
    for (let i = 0; i < rawData.length; i++) {
      console.log('rawItem:', rawData[i]);
      for (const key in eachObj) {
        if (rawData[i][key] === null || rawData[i][key] === undefined || rawData[i][key] === '') {
          rawData[i][key] = ' - ';
        }
      }
    }
    tableData.value = rawData;
    total.value = response.data.data.total;
    // ElMessage.success('获取数据成功');
  } catch (error) {
    ElMessage.error('获取数据失败');
  }
};

// 初始化加载
loadData();

// 列定义
const columns = [
  { prop: 'username', label: '用户名' },
  { prop: 'name', label: '真实姓名' },
  { prop: 'school', label: '学校' },
  { prop: 'clazz', label: '班级' },
  { prop: 'grade', label: '年级' },
  { prop: 'cfRanking', label: 'CF分数', sortable: true },
];

// 处理行点击事件
const handleRowClick = (row) => {
  if (row && row.id !== undefined && row.id !== null) {
    // 导航到用户详细信息页面，并传递用户ID作为路由参数
    router.push({ path: `/userlist/${row.id}` }); // 跳转到用户详情页面
  } else {
    console.error('无效的用户ID:', row.id);
    // 或者在此处添加适当的错误处理逻辑，例如提示用户或者记录错误信息
  }
};


// 处理当前页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  loadData();
};

</script>
