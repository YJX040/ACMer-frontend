<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
</script>

<template>
  <header>
    <div class="wrapper">
      <el-menu :default-active="$route.path" mode="horizontal" router menu-align-right>
        <el-menu-item index="/">
          <RouterLink to="/">首页</RouterLink>
        </el-menu-item>
        <el-menu-item index="/user">
          <RouterLink to="/user">用户页</RouterLink>
        </el-menu-item>
        <el-sub-menu index="/user-competitions">
          <template #title>
            <span>codeforce</span>
          </template>
          <el-menu-item index="/rankings">
            <RouterLink to="/rankings">用户排名</RouterLink>
          </el-menu-item>
          <el-menu-item index="/contests">
            <RouterLink to="/contests">比赛列表</RouterLink>
          </el-menu-item>
          <el-menu-item index="/problems">
            <RouterLink to="/problems">题目列表</RouterLink>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/recommendation">
          <RouterLink to="/recommendation">智能推荐</RouterLink>
        </el-menu-item>
        <el-menu-item index="/login" >
          <RouterLink to="/login">登录</RouterLink>
        </el-menu-item>
        <el-menu-item index="/register">
          <RouterLink to="/register">注册</RouterLink>
        </el-menu-item>
      </el-menu>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.wrapper {
  padding: 20px;
}

.el-menu {
  background-color: #ffffff;
  color: #000;
}

.el-menu-item a {
  color: #000;
}

.el-menu-item .router-link-exact-active {
  color: #ffd04b;
}

.el-menu-item a.router-link-exact-active {
  color: #ffd04b;
}
</style>
