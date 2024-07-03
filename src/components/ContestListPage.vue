<template>
  <div class="contest-list-page">
    <el-table :data="filteredContests" style="width: 100%;">
      <!-- 比赛ID列 -->
      <el-table-column prop="id" label="比赛ID"></el-table-column>
      <!-- 比赛名称列 -->
      <el-table-column prop="name" label="比赛名称">
        <template #header>
          <div>比赛名称</div>
          <el-input v-model="filter.name" placeholder="比赛名称" size="small" />
        </template>
      </el-table-column>
      <!-- 比赛类型列 -->
      <el-table-column prop="type" label="比赛类型"></el-table-column>
      <!-- 开始时间列 -->
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <!-- 持续时间列 -->
      <el-table-column prop="duration" label="持续时间"></el-table-column>
      <!-- 参与人数列 -->
      <el-table-column prop="participants" label="参与人数" width="180">
        <template #header>
          <div>参与人数</div>
          <el-checkbox v-model="showAllContests">显示所有比赛</el-checkbox>
        </template>
        <template #default="{ row }">
          {{ row.participants }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getContests } from '../api'

export default {
  name: 'ContestListPage',
  data() {
    return {
      contests: [],
      filter: {
        id: '',
        name: '',
        type: '',
        startTime: '',
        duration: '',
        participants: ''
      },
      contestTypes: ['Type1', 'Type2', 'Type3'] // 示例比赛类型列表
    }
  },
  computed: {
    filteredContests() {
      return this.contests.filter(contest => {
        return (
          (!this.filter.id || contest.id.includes(this.filter.id)) &&
          (!this.filter.name || contest.name.includes(this.filter.name)) &&
          (!this.filter.type || contest.type === this.filter.type) &&
          (!this.filter.startTime || contest.startTime.includes(this.filter.startTime)) &&
          (!this.filter.duration || contest.duration.includes(this.filter.duration)) &&
          (this.showAllContests || parseInt(contest.participants) > 0 || !contest.participants)
        )
      })
    }
  },
  created() {
    getContests().then(response => {
      this.contests = response.data
    })
  }
}
</script>

<style scoped>
.contest-list-page {
  padding: 20px;
}

.el-table th, .el-table td {
  padding: 12px 0;
}
</style>