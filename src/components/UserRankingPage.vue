<template>
  <div class="user-ranking-page">
    <el-table :data="filteredRankings" style="width: 100%;">
      <!-- 排名列 -->
      <el-table-column prop="ranking" label="排名">
        <template #header>
          <div>排名</div>
        </template>
      </el-table-column>
      <!-- 学校列 -->
      <el-table-column prop="school" label="学校">
        <template #header>
          <div>学校</div>
        </template>
      </el-table-column>
      <!-- 班级列 -->
      <el-table-column prop="class" label="班级">
        <template #header>
          <div>班级</div>
        </template>
      </el-table-column>
      <!-- 用户名列 -->
      <el-table-column prop="username" label="用户名">
        <template #header>
          <div>用户名</div>
        </template>
      </el-table-column>
      <!-- 用户状态列 -->
      <el-table-column prop="status" label="用户状态">
        <template #header>
          <div>用户状态</div>
          <el-select v-model="filter.status" placeholder="用户状态" size="small">
            <el-option v-for="status in userStatuses" :key="status" :label="status" :value="status"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- 分数列 -->
      <el-table-column prop="score" label="分数">
        <template #header>
          <div>分数</div>
        </template>
      </el-table-column>
      <!-- 比赛次数列 -->
      <el-table-column prop="competitionCount" label="比赛次数">
        <template #header>
          <div>比赛次数</div>
        </template>
      </el-table-column>
      <!-- 解题数列 -->
      <el-table-column prop="solvedProblems" label="解题数">
        <template #header>
          <div>解题数</div>
        </template>
      </el-table-column>
      <!-- 补题数列 -->
      <el-table-column prop="makeupProblems" label="补题数">
        <template #header>
          <div>补题数</div>
        </template>
      </el-table-column>
      <!-- 持有者列 -->
      <el-table-column prop="owner" label="持有者">
        <template #header>
          <div>持有者</div>
        </template>
      </el-table-column>
      <!-- 帐号类型列 -->
      <el-table-column prop="accountType" label="帐号类型">
        <template #header>
          <div>帐号类型</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserRankings } from '../api'

export default {
  name: 'UserRankingPage',
  data() {
    return {
      rankings: [],
      filter: {
        status: ''
      },
      userStatuses: ['active', 'inactive', 'banned'] // 示例用户状态列表
    }
  },
  computed: {
    filteredRankings() {
      return this.rankings.filter(ranking => {
        return (
          (!this.filter.status || ranking.status === this.filter.status)
        )
      })
    }
  },
  created() {
    getUserRankings().then(response => {
      this.rankings = response.data
    })
  }
}
</script>

<style scoped>
.user-ranking-page {
  padding: 20px;
}

.el-table th, .el-table td {
  padding: 12px 0;
}
</style>
