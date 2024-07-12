<template>
  <el-input v-model="input" style="width: 200px" placeholder="查询班级" />
  <el-button type="primary" styLe="margin:0 10px">查询</el-button>
  <el-input v-model="input" style="width: 200px" placeholder="查询姓名" />
  <el-button type="primary" styLe="margin:0 10px">查询</el-button>
  <el-input v-model="input" style="width: 200px" placeholder="查询用户名" />
  <el-button type="primary" styLe="margin:0 10px">查询</el-button>
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

// const data = reactive({
//   name:'',
//   tableData:[],
//   total:0,
//   pageNum:1,
//   pageSize:5
// })

// const load = () =>{
//   request.get(,{
//     params :{
//       pageNum: data.pageNum,
//       pageSize: data.pageSize,
//       name: data.name,
//     }
//   }).then(res => {
//     data.tableData = res.data?.list || []
//     data.total = res.data?.total || 0
//   })
// }
// load()

const tableData = [
  { school:'北京化工大学', class: '计科2101', grade: '2021', name: 'zxy', username: 2021040011, tag: '启用', cf:122,numCf:133,cfPlus:144,cfPlusPlus:155 },
  { school:'北京化工大学', class: '计科2101', grade: '2021', name: 'zxy', username: 2021040011, tag: '启用', cf:122,numCf:133,cfPlus:144,cfPlusPlus:155 },
  { school:'南通大学', class: '计科2101', grade: '2021', name: 'zxy', username: 2021040011, tag: '启用', cf:122,numCf:133,cfPlus:144,cfPlusPlus:155 },
  { school:'北京化工大学', class: '计科2101', grade: '2022', name: 'zxy', username: 2021040011, tag: '启用', cf:122,numCf:133,cfPlus:144,cfPlusPlus:155 },
  { school:'北京化工大学', class: '计科2101', grade: '2022', name: 'zxy', username: 2021040011, tag: '退役', cf:122,numCf:133,cfPlus:144,cfPlusPlus:155 },
  { school:'北京化工大学', class: '计科2101', grade: '2021', name: 'zxy', username: 2021040011, tag: '启用', cf:122,numCf:133,cfPlus:144,cfPlusPlus:155 },

  // 其他数据
];

const filterTag = (value, row) => row.tag === value;
const filterSchool = (value, row) => row.school === value;
const filterGrade = (value, row) => row.grade === value;

const columns = [
  {
    prop: 'school',
    label: '学校',
    width: 100,
    filters: [
      { text: '北京化工大学', value: '北京化工大学' },
      { text: '南通大学', value: '南通大学' },
    ],
    filterMethod: filterSchool,
    filterPlacement: 'bottom-end',
  },
  {
    prop: 'tag',
    label: '用户状态',
    width: 100,
    filters: [
      { text: '启用', value: '启用' },
      { text: '退役', value: '退役' },
    ],
    filterMethod: filterTag,
    filterPlacement: 'bottom-end',
  },
  {
    prop: 'grade',
    label: '年级',
    width: 100,
    filters: [
      { text: '2021', value: '2021' },
      { text: '2022', value: '2022' },
    ],
    filterMethod: filterGrade,
    filterPlacement: 'bottom-end',
  },
  
  { prop: 'class', label: '班级', width: 100 },
  { prop: 'name', label: '真实姓名', width: 100 },
  { prop: 'username', label: '用户名', width: 100 },
  
  { prop: 'cf', label: 'cf', sortable: true,width: 80 },
  { prop: 'numCf', label: '#cf', sortable: true,width: 80 },
  { prop: 'cfPlus', label: 'cf+', sortable: true,width: 80 },
  { prop: 'cfPlusPlus', label: 'cf++', sortable: true,width: 80 },
];
</script>
