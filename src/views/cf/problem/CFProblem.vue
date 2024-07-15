<template>
  <el-table :data="tableData" @row-click="handleRowClick">
    <el-table-column
      v-for="column in columns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :sortable="column.sortable"
      :width="column.width"
    >
      <template #default="scope">
        <template v-if="column.prop === 'tags'">
          <el-tag v-for="tag in scope.row.tags" :key="tag">{{ tag }}</el-tag>
        </template>
        <template v-else>
          {{ scope.row[column.prop] }}
        </template>
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-pagination
    v-model:current-page="currentPage"
    :total="total"
    :page-size="pageSize"
    layout="total,  prev, pager, next, jumper"
    @current-change="handleCurrentChange"
  /> -->
  <CustomPagination
    :current-page="currentPage"
    :total="total"
    :page-size="pageSize"
    @update:currentPage="handleCurrentChange"
  />
</template>

<!-- <template>
  <div>
    <List :columns="columns" :tableData="tableData" @row-click="handleRowClick" >
      <template #tag="{ row }">
        <el-tag v-for="tag in row.row.tags" :key="tag">{{ tag }}</el-tag>
      </template>
    </List>
    <el-pagination v-model:current-page="currentPage" :total="total" :page-size="pageSize"
      layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" />
  </div>
</template> -->

<script setup>
import { ref, onMounted } from 'vue';
import contestApi from '@/api/contest';
import CustomPagination from '@/components/CustomPagination.vue';
// 定义表格列
const columns = [
  { prop: 'id', label: '题目ID', sortable: true, columnKey: 'id', width: '100px' },
  { prop: 'contestId', label: '比赛ID', width: '100px' },
  { prop: 'index', label: '问题ID', width: '100px' },
  { prop: 'name', label: '题目名称', width: '200px' },
  { prop: 'type', label: '题目类型', width: '200px' },
  { prop: 'rating', label: '题目难度', width: '100px' },
  { prop: 'tags', label: '标签' }
];

// 定义响应式数据
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = 10;
const total = ref(0);

// 获取表格数据
const fetchTableData = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize,
  };
  const response = await contestApi.listProblem(params);
  tableData.value = response.data.data.items;
  total.value = response.data.data.total;
};

// 处理当前页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchTableData();
};

// 组件挂载时获取初始数据
onMounted(() => {
  fetchTableData();
});

// 处理行点击事件
const handleRowClick = (row) => {
  const url = `https://codeforces.com/contest/${row.contestId}/problem/${row.index}`;
  // ElMessageBox.confirm(`确定要跳转到 比赛${row.contestId}${row.index}题 吗？`, '提示', {
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  //   type: 'warning',
  // }).then(() => {
    window.open(url, '_blank');
  // }).catch(() => {
  //   // 用户取消，不进行任何操作
  // });
};
</script>
