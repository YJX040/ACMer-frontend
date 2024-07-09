<template>
    <div>
      <List :columns="columns" :tableData="tableData" />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import List from '@/components/List.vue';
  
  const columns = computed(() => [
    { prop: 'name', label: '比赛名', sortable: true },
    { prop: 'startTime', label: '开始时间', sortable: true },
    { prop: 'endTime', label: '结束时间', sortable: true },
    { prop: 'totalParticipants', label: '总人数', sortable: true },
    { prop: 'totalQuestions', label: '累计解题数量', sortable: true },
    { prop: 'totalPoints', label: '累计题目分数', sortable: true },
    { prop: 'status', label: '比赛状态', sortable: false, slot: 'statusSlot' },
  ]);
  
  const tableData = computed(() => [
    { name: '2024ACM队员周训练-27', startTime: '2024/7/8 08:00:00', endTime: '2024/7/14 22:00:00', totalParticipants: 17, totalQuestions: 39, totalPoints: 41400, status: '进行中' },
    { name: '2024ACM队员周训练-26', startTime: '2024/7/1 08:00:00', endTime: '2024/7/7 22:00:00', totalParticipants: 25, totalQuestions: 187, totalPoints: 176600, status: '已结束' },
    { name: '2024ACM队员周训练-25', startTime: '2024/6/24 08:00:00', endTime: '2024/6/30 22:00:00', totalParticipants: 1, totalQuestions: 3, totalPoints: 2600, status: '已结束' },
    { name: '2024ACM队员周训练-24', startTime: '2024/6/17 08:00:00', endTime: '2024/6/23 22:00:00', totalParticipants: 1, totalQuestions: 1, totalPoints: 800, status: '已结束' },
    { name: '2024ACM队员周训练-23', startTime: '2024/6/10 08:00:00', endTime: '2024/6/16 22:00:00', totalParticipants: 9, totalQuestions: 24, totalPoints: 26100, status: '已结束' },
    { name: '2024ACM队员周训练-22', startTime: '2024/6/3 08:00:00', endTime: '2024/6/9 22:00:00', totalParticipants: 21, totalQuestions: 68, totalPoints: 70000, status: '已结束' },
    { name: '2024ACM队员周训练-21', startTime: '2024/5/27 08:00:00', endTime: '2024/6/2 22:00:00', totalParticipants: 19, totalQuestions: 66, totalPoints: 67100, status: '已结束' },
    { name: '2024ACM队员周训练-20', startTime: '2024/5/20 08:00:00', endTime: '2024/5/26 22:00:00', totalParticipants: 9, totalQuestions: 41, totalPoints: 38800, status: '已结束' },
    { name: '2024ACM队员周训练-19', startTime: '2024/5/13 08:00:00', endTime: '2024/5/19 22:00:00', totalParticipants: 13, totalQuestions: 58, totalPoints: 53700, status: '已结束' },
    { name: '2024ACM队员周训练-18', startTime: '2024/5/6 08:00:00', endTime: '2024/5/12 22:00:00', totalParticipants: 19, totalQuestions: 50, totalPoints: 47800, status: '已结束' },
    { name: '2024ACM队员周训练-17', startTime: '2024/4/29 08:00:00', endTime: '2024/5/5 22:00:00', totalParticipants: 13, totalQuestions: 50, totalPoints: 40700, status: '已结束' }
  ]);
  
  const statusSlot = {
    template: `<div>
                <el-button type="primary" v-if="scope.row.status === '进行中'">题目</el-button>
                <el-button type="info" v-else>榜单</el-button>
                <el-button type="success" v-else>记录</el-button>
                <el-button type="warning" v-else>加入</el-button>
               </div>`
  };
  </script>
  