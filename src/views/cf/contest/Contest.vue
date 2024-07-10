<template>
  <List :columns="columns" :tableData="tableData" :showSearch="true" :showCheckbox="true" />
  <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[1, 2, 3, 4]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="3"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script setup>
import List from '@/components/List.vue';
import CustomTag from '@/components/CustomTag.vue';

const tableData = [
  { testid: 1, testname: 'contest1', date: '2016-05-01', duration: '2:15:0', num: 100, tag: 'CF' },
  { testid: 2, testname: 'contest2', date: '2024-05-02', duration: '2:15:0', num: 0, tag: 'CF' },
  { testid: 3, testname: 'contest3', date: '2016-05-03', duration: '2:15:0', num: 100, tag: 'ICPC' },
  // 其他数据
];

const filterTag = (value, row) => row.tag === value;

const columns = [
  {
    prop: 'testid',
    label: '比赛id',
    sortable: true,
    width: 180,
    columnKey: 'testid',
  },
  { prop: 'testname', label: '比赛名称', width: 180 },
  {
    prop: 'tag',
    label: '比赛类型',
    width: 100,
    filters: [
      { text: 'CF', value: 'CF' },
      { text: 'ICPC', value: 'ICPC' },
    ],
    filterMethod: filterTag,
    filterPlacement: 'bottom-end',
    slot: CustomTag // 这里使用自定义插槽组件的名称
  },
  {
    prop: 'date',
    label: '开始时间',
    sortable: true,
    width: 180,
    columnKey: 'date',
  },
  {
    prop: 'duration',
    label: '持续时间',
    sortable: true,
    width: 180,
    columnKey: 'duration',
  },
  { prop: 'num', label: '参与人数', width: 180 },
];
</script>
