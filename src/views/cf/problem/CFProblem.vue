<template>
    <List :columns="columns" :tableData="tableData" />
    <el-pagination
      v-model:current-page="currentPage"
      :total="total"
      :page-size="pageSize"
      layout="total,  prev, pager, next, jumper"
      @current-change="handleCurrentChange"
    /> 
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import contestApi from '@/api/contest';
  import CustomTag from '@/components/CustomTag.vue';
  
  // 定义表格列
  const columns = [
    { prop: 'id', label: '题目ID', sortable: true, columnKey: 'id' , width:'100px'},
    { prop: 'contestId', label: '比赛ID',width:'100px' },
    { prop: 'index', label: '问题ID' ,width:'100px'},
    { prop: 'name', label: '题目名称',width:'200px' },
    { prop: 'type', label: '题目类型',width:'200px' },
    { prop: 'rating', label: '题目难度',width:'100px' },
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
  
  </script>