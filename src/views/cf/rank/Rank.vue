<template>
  <div>
    <List :columns="columns" :tableData="tableData" @row-click="handleRowClick" >
      <template #user="{ row }">
        <span>{{ row.user.username }}</span>
      </template>
    </List>
    <CustomPagination
      :current-page="currentPage"
      :total="total"
      :page-size="pageSize"
      @update:currentPage="handleCurrentChange"
    />
    <!-- <el-pagination v-model:current-page="currentPage" :total="total" :page-size="pageSize"
      layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import List from '@/components/List.vue';
import cfApi from '@/api/contest';
import CustomPagination from '@/components/CustomPagination.vue';

const columns = [
  { prop: 'id', label: '排名', sortable: true },
  { prop: 'handle', label: '用户名', sortable: true },
  { prop: 'rating', label: '分数', sortable: true },
  { prop: 'user', label: '用户持有者', sortable: false },
  { prop: 'accountType', label: '账号类型', sortable: false },
];

const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
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
  // ElMessageBox.confirm(`确定要跳转到${row.handle}界面吗？`, '提示', {
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  //   type: 'warning',
  // }).then(() => {
    window.open(url, '_blank');
  // }).catch(() => {
  //   // 用户取消，不进行任何操作
  // });
};

onMounted(() => {
  fetchTableData();
});
</script>

<style scoped></style>
