<template>
  <div>
    <List :columns="columns" :tableData="tableData" />
    <el-pagination
      v-model:current-page="currentPage"
      :total="total"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import contestApi from '@/api/contest';
import { formatTime,formatDuration } from '@/utils/timeUtils'; // 导入时间格式化函数

// 定义表格列
const columns = [
  { prop: 'id', label: '比赛ID', sortable: true, columnKey: 'id', width: '100px' },
  { prop: 'name', label: '比赛名称', width: '200px' },
  { prop: 'startTimeSeconds', label: '开始时间', width: '200px', formatter: formatTime },
  { prop: 'durationSeconds', label: '持续时间', width: '200px', formatter: formatDuration },
  { prop: 'relativeTimeSeconds', label: '相对时间', width: '200px', formatter: formatDuration },
  { prop: 'phase', label: '阶段', width: '100px' },
  { prop: 'type', label: '类型', width: '100px' },
  // { prop: 'frozen', label: '冻结', width: '100px' }
];

// 定义响应式数据
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 获取表格数据
const fetchTableData = async () => {
  try {
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
    };
    const response = await contestApi.listContest(params);
    if (response.data && response.data.data) {
      tableData.value = response.data.data.items || [];
      total.value = response.data.data.total || 0;
    } else {
      console.error('Invalid response data:', response);
    }
  } catch (error) {
    console.error('Failed to fetch table data:', error);
  }
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
</script>
