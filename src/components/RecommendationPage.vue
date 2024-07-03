<template>
    <div class="recommendation-page">
      <el-table :data="recommendations">
        <el-table-column prop="title" label="题目标题" width="180"/>
        <el-table-column prop="difficulty" label="难度" width="180"/>
        <el-table-column prop="tags" label="标签" width="180"/>
      </el-table>
    </div>
  </template>
  
  <script>
  import { getRecommendations } from '../api'
  
  export default {
    name: 'RecommendationPage',
    data() {
      return {
        recommendations: []
      }
    },
    created() {
      getRecommendations().then(response => {
        this.recommendations = response.data
      })
    }
  }
  </script>
  
  <style scoped>
    .recommendation-page {
    padding: 20px;
    }
    </style>
  