<template>
  <el-input v-model="input" style="width: 200px" placeholder="查询比赛名称" />
  <el-button type="primary" style="margin-left:10px" @click="load">查询</el-button>
  <div>
    <List :columns="columns" :tableData="tableData" @sort-change="handleSortChange" @filter-change="handleFilterChange" />
    <CustomPagination
      :current-page="currentPage"
      :total="total"
      :page-size="pageSize"
      @update:currentPage="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import contestApi from '@/api/contest';
import List from '@/components/List.vue';
import CustomTag from '@/components/CustomTag.vue'; 
import CustomPagination from '@/components/CustomPagination.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// 定义表格列
const columns = [
  { prop: 'id', label: '比赛ID', sortable: true, columnKey: 'id', width: '100px' },
  { prop: 'name', label: '比赛名称', width: '200px' },
  { prop: 'startTimeSeconds', label: '开始时间', width: '200px' },
  { prop: 'durationSeconds', label: '持续时间', width: '200px' },
  { prop: 'relativeTimeSeconds', label: '相对时间', width: '200px' },
  {
    prop: 'phase', label: '阶段', width: '100px',
    filters: [
      { text: 'FINISHED', value: 'FINISHED' },
      { text: 'BEFORE', value: 'BEFORE' },
    ],
    filterPlacement: 'bottom-end',
    component: CustomTag
  },
  { prop: 'type', label: '类型', width: '100px' }
];

// 定义响应式数据
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const input = ref('');
const selectedPhase = ref(''); // 新增的响应式数据
const sortProp = ref(''); // 排序字段
const sortOrder = ref(''); // 排序顺序

// 获取表格数据
const fetchTableData = async () => {
  try {
    // 构建请求参数对象，过滤掉空值
    const params = {
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      ...(input.value ? { name: input.value } : {}),
      ...(selectedPhase.value ? { phase: selectedPhase.value } : {}),
      ...(sortProp.value ? { orderBy: sortProp.value } : {}),
      ...(sortOrder.value ? { order: sortOrder.value } : {}),
    };
    const response = await contestApi.listContest(params);
    if (response.data && response.data.data) {
      tableData.value = response.data.data.items || [];
      total.value = response.data.data.total || 0;
      authStore.setProblemCount(response.data.data.total);
    } else {
      console.error('无效的响应数据:', response);
    }
  } catch (error) {
    console.error('获取表格数据失败:', error);
  }
};

// 处理当前页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchTableData();
};

// 处理筛选变化
const handleFilterChange = (filters) => {
  console.log('filters:', filters);
  // 遍历 filters 对象，找到包含 "phase" 的过滤条件
  for (const key in filters) {
    if (filters[key] && Array.isArray(filters[key]) && filters[key].length > 0) {
      // 假设 phase 相关的过滤条件在 filters 对象中是唯一的
      if (columns.some(column => column.prop === 'phase' && column.label.includes('阶段'))) {
        selectedPhase.value = filters[key][0];
        break;
      }
    }
  }
  sortProp.value = 'phase';
  fetchTableData();
};

// 处理排序变化
const handleSortChange = ({ prop, order }) => {
  sortProp.value = prop;
  sortOrder.value = order === 'ascending' ? 'asc' : (order === 'descending' ? 'desc' : '');
  fetchTableData();
};

// 组件挂载时获取初始数据
onMounted(() => {
  fetchTableData();
});

// 加载数据
const load = () => {
  currentPage.value = 1; // 查询时重置为第一页
  fetchTableData();
};
</script>

<style scoped>
</style>
