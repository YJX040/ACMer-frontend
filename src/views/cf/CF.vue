<template>
    <div class="cf-page">
      <el-card class="intro-card">
        <template v-slot:header>
          <span>什么是 Codeforces?</span>
        </template>
        <div class="intro-content">
          <p>
            Codeforces 是一个面向编程竞赛的在线平台，提供了一系列编程竞赛、练习题目和社交功能。用户可以在这个平台上参加各种编程比赛，解决编程问题，并与其他编程爱好者交流学习。
          </p>
        </div>
      </el-card>
      <el-card class="nav-card">
        <template v-slot:header>
          <span>Codeforces 导航</span>
        </template>
        <div class="nav-links">
          <el-button type="primary" @click="navigateTo('/cf/problem')">CF题目</el-button>
          <el-button type="success" @click="navigateTo('/cf/contest')">比赛</el-button>
          <el-button type="info" @click="navigateTo('/cf/rank')">排名</el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const navigateTo = (path) => {
    router.push(path);
  };
  </script>
  
  <style lang="scss" scoped>
  .cf-page {
    padding: 20px;
  }
  
  .intro-card {
    margin-bottom: 20px;
  }
  
  .intro-content {
    font-size: 16px;
    line-height: 1.5;
  }
  
  .nav-card {
    text-align: center;
  }
  
  .nav-links {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  </style>
  
