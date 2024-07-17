<template>
  <div>
    <List :columns="columns" :tableData="tableData" @row-click="handleRowClick">
      <template #user="{ row }">
        <span>{{ row.user.username }}</span>
      </template>
    </List>
    <CustomPagination :current-page="currentPage" :total="total" :page-size="pageSize"
      @update:currentPage="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import List from '@/components/List.vue';
import cfApi from '@/api/contest';
import CustomPagination from '@/components/CustomPagination.vue';
import { ElMessage } from 'element-plus';

const columns = [
  { prop: 'id', label: '排名' },
  { prop: 'handle', label: '用户名', },
  { prop: 'rating', label: '分数' },
  { prop: 'user', label: '用户持有者', sortable: false },
  { prop: 'accountType', label: '账号类型', sortable: false },
];

const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(15);
const total = ref(0);
const fetchTableData = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
  console.log('Fetch table data:', params);
  try {
    const response = await cfApi.listRank(params);
    tableData.value = response.data.data.items;
    total.value = response.data.data.total;
    // ElMessage.success('获取排名列表成功');
  } catch (error) {
    console.error('Failed to fetch table data:', error);
  }
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchTableData();
};


const handleRowClick = (row) => {
  const url = `https://codeforces.com/profile/${row.handle}`;
  window.open(url, '_blank');
};

onMounted(() => {
  fetchTableData();
});
</script>

<style scoped></style>
