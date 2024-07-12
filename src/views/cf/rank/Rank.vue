<template>
  <div>
    <List :columns="columns" :tableData="tableData" />
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
  </div>
</template>

<script setup>
import { computed } from 'vue';
import List from '@/components/List.vue';

const columns = computed(() => [
  { prop: 'id', label: '排名', sortable: true },
  { prop: 'school', label: '学校', sortable: false },
  { prop: 'class', label: '班级', sortable: false },
  { prop: 'name', label: '姓名', sortable: false },
  { prop: 'score', label: '分数', sortable: true },
  { prop: 'status', label: '状态', sortable: false },
  { prop: 'times', label: '次数', sortable: false },
  // 解题数    
  { prop: 'solved', label: '解题数', sortable: true },
  // 补题数
  { prop: 'penalty', label: '补题数', sortable: true },
  // 用户持有者
  { prop: 'user', label: '用户持有者', sortable: false },
  // 账号类型
  { prop: 'type', label: '账号类型', sortable: false },

]);

const tableData = computed(() => [
  //生成随机数据
  { id: 1, school: '清华大学', class: '计算机科学与技术', name: '张三', score: 100, status: '已结束', times: 1, solved: 10, penalty: 0, user: '张三', type: '学生' },
  { id: 2, school: '北京大学', class: '计算机科学与技术', name: '李四', score: 90, status: '已结束', times: 1, solved: 9, penalty: 0, user: '李四', type: '学生' },
  { id: 3, school: '清华大学', class: '计算机科学与技术', name: '王五', score: 80, status: '已结束', times: 1, solved: 8, penalty: 0, user: '王五', type: '学生' },
  { id: 4, school: '北京大学', class: '计算机科学与技术', name: '赵六', score: 70, status: '已结束', times: 1, solved: 7, penalty: 0, user: '赵六', type: '学生' },
  { id: 5, school: '清华大学', class: '计算机科学与技术', name: '孙七', score: 60, status: '已结束', times: 1, solved: 6, penalty: 0, user: '孙七', type: '学生' },
  { id: 6, school: '北京大学', class: '计算机科学与技术', name: '周八', score: 50, status: '已结束', times: 1, solved: 5, penalty: 0, user: '周八', type: '学生' },
  { id: 7, school: '清华大学', class: '计算机科学与技术', name: '吴九', score: 40, status: '已结束', times: 1, solved: 4, penalty: 0, user: '吴九', type: '学生' },
  { id: 8, school: '北京大学', class: '计算机科学与技术', name: '郑十', score: 30, status: '已结束', times: 1, solved: 3, penalty: 0, user: '郑十', type: '学生' },
  { id: 9, school: '清华大学', class: '计算机科学与技术', name: '钱十一', score: 20, status: '已结束', times: 1, solved: 2, penalty: 0, user: '钱十一', type: '学生' },
  { id: 10, school: '北京大学', class: '计算机科学与技术', name: '孙十二', score: 10, status: '已结束', times: 1, solved: 1, penalty: 0, user: '孙十二', type: '学生' },
]);


</script>
