<template>
  <div class="home-page">
    <el-row :gutter="20">
      <el-col :span="16"> <!-- 左侧占据70%的宽度 -->
        <el-card>
          <template v-slot:header>
            <span>近七天提交数</span>
          </template>
          <div>{{ recentSubmissions }}</div>
        </el-card>
        <el-card>
          <template v-slot:header>
            <span>智能训练</span>
          </template>
          <div>{{ intelligentTraining }}</div>
        </el-card>
        <el-card>
          <template v-slot:header>
            <span>已结束的比赛</span>
          </template>
          <div>{{ pastContests }}</div>
        </el-card>
        <el-card>
          <template v-slot:header>
            <span>即将到来的比赛</span>
          </template>
          <div>{{ upcomingContests }}</div>
        </el-card>
      </el-col>
      <el-col :span="8"> <!-- 右侧占据30%的宽度 -->
        <el-card>
          <template v-slot:header>
            <span>Codeforce展示</span>
          </template>
          <div>{{ cfData }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getRecentSubmissions, getIntelligentTraining, getPastContests, getUpcomingContests, getCFData } from '../api'

export default {
  name: 'HomePage',
  data() {
    return {
      recentSubmissions: '',
      intelligentTraining: '',
      pastContests: '',
      upcomingContests: '',
      cfData: ''
    }
  },
  created() {
    getRecentSubmissions().then(response => {
      this.recentSubmissions = response.data
    })
    getIntelligentTraining().then(response => {
      this.intelligentTraining = response.data
    })
    getPastContests().then(response => {
      this.pastContests = response.data
    })
    getUpcomingContests().then(response => {
      this.upcomingContests = response.data
    })
    getCFData().then(response => {
      this.cfData = response.data
    })
  }
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}
</style>
