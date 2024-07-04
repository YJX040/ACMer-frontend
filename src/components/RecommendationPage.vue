<template>
    <div class="recommendation-page">
      <el-table :data="recommendations">
        <el-table-column prop="title" label="题目标题" />
        <el-table-column prop="difficulty" label="难度" "/>
        <el-table-column prop="tags" label="标签" />
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
  
