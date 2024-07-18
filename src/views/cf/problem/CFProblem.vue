<template>
  <!-- <el-input v-model="input" style="width: 200px" placeholder="查询题目名称" />
  <el-button type="primary" style="margin-left:10px" @click="fetchTableData">查询</el-button> -->
  <el-table :data="tableData" @row-click="handleRowClick" @sort-change="handleSortChange">
    <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
      :sortable="column.sortable" :width="column.width">
      <template #default="scope">
        <template v-if="column.prop === 'tags'">
          <el-tag v-for="tag in scope.row.tags" :key="tag">{{ tag }}</el-tag>
        </template>
        <template v-else-if="column.prop === 'rating'">
          <el-tag v-if="scope.row.rating >= 2400" type="danger">
            {{ scope.row.rating }}
          </el-tag>
          <el-tag v-else-if="scope.row.rating >= 2100" type="warning">
            {{ scope.row.rating }}
          </el-tag>
          <el-tag v-else-if="scope.row.rating >= 1800" type="success">
            {{ scope.row.rating }}
          </el-tag>
          <el-tag v-else-if="scope.row.rating >= 1200" type="primary">
            {{ scope.row.rating }}
          </el-tag>
          <el-tag v-else-if="scope.row.rating===undefined||scope.row.rating===''"  type="info">
            {{ 0 }}
          </el-tag>
          <el-tag v-else type="info">
            {{ scope.row.rating }}
          </el-tag>
        </template>
        <template v-else>
          {{ scope.row[column.prop] }}
        </template>
      </template>
    </el-table-column>
  </el-table>
  <CustomPagination :current-page="currentPage" :total="total" :page-size="pageSize"
    @update:currentPage="handleCurrentChange" />
</template>


<script setup>
import { ref, onMounted } from 'vue';
import contestApi from '@/api/contest';
import CustomPagination from '@/components/CustomPagination.vue';
import { ElMessage } from 'element-plus';
// 定义表格列
const columns = [
  { prop: 'id', label: '题目ID', sortable: true, columnKey: 'id', minwidth: '100px' },
  { prop: 'contestId', label: '比赛ID', sortable: true, columnKey: 'contestId', minwidth: '100px' },
  { prop: 'index', label: '问题ID', minwidth: '100px' },
  { prop: 'name', label: '题目名称', minwidth: '200px' },
  { prop: 'type', label: '题目类型', minwidth: '120px' },
  { prop: 'rating', label: '题目难度', sortable: true, columnKey: 'rating', minwidth: '80px' },
  { prop: 'tags', label: '标签', minwidth: "200px" }
];

// 定义响应式数据
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = 15;
const total = ref(0);
const sortProp = ref('');
const sortOrder = ref('');
const eachObj = {
  id: -1,
  contestId: -1,
  index: '',
  name: '',
  type: '',
  rating: -1,
  tags:'',
}


// 获取表格数据
const fetchTableData = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize,
    // ...(input.value ? { name: input.value } : {}),
    ...(sortProp.value ? { orderBy: sortProp.value } : {}),
    ...(sortOrder.value ? { order: sortOrder.value } : {}),
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

// 处理排序变化
const handleSortChange = ({ prop, order }) => {
  if (prop === 'contestId') prop = 'contest_id';
  sortProp.value = prop;
  sortOrder.value = order === 'ascending' ? 'asc' : (order === 'descending' ? 'desc' : '');
  fetchTableData();
};

// 组件挂载时获取初始数据
onMounted(() => {
  fetchTableData();
});

// 处理行点击事件
const handleRowClick = (row) => {
  const url = `https://codeforces.com/contest/${row.contestId}/problem/${row.index}`;
  window.open(url, '_blank');
};
</script>
