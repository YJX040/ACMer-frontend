<template>
<<<<<<< HEAD
    <div>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped></style>
=======
  <List :columns="columns" :tableData="tableData" />
</template>

<script setup>
import List from '@/components/List.vue';

const tableData = [
  { testid: 1, date: '2016-05-01', duration: '2:15:0', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'CF' },
  { testid: 2, date: '2024-05-02', duration: '2:15:0', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'CF' },
  { testid: 3, date: '2016-05-03', duration: '2:15:0', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'ICPC' },
  { testid: 4, date: '2016-05-04', duration: '2:15:0', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'ICPC' },
  { testid: 5, date: '2016-05-05', duration: '2:15:0', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'ICPC' },
  { testid: 6, date: '2016-05-06', duration: '2:15:0', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'CF' },
  { testid: 7, date: '2016-05-07', duration: '2:15:0', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'CF' },
  { testid: 8, date: '2016-05-08', duration: '2:15:0', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'CF' },
  { testid: 9, date: '2016-05-09', duration: '2:15:0', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', tag: 'CF' },
  // 其他数据
];

const filterHandler = (value, row, column) => {
  const property = column['property'];
  return row[property] === value;
};

const filterTag = (value, row) => row.tag === value;


const columns = [
  {
    prop: 'testid',
    label: '比赛id',
    sortable: true,
    width: 180,
    columnKey: 'date',
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
    columnKey: 'date',
  },
  { prop: 'name', label: 'Name', width: 180 },
  { prop: 'address', label: 'Address', formatter: row => row.address },
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
    slot: {
      template: `<el-tag :type="scope.row.tag === 'CF' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>`,
    },
  },
];
</script>
>>>>>>> 841dd7bcb5f457f53ca1951d3b3d76c54f132c44
