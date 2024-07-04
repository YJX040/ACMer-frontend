<script setup>
import { RouterLink, RouterView , useRouter} from 'vue-router'
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'

const router = useRouter()
</script>

<template>
  <header>
    <div>
      <el-menu :default-active="$route.path" mode="horizontal" router menu-align-right :ellipsis="false">
        <el-menu-item index="/">
          <span @click="router.push({path: '/'})">首页</span>
          <!-- <RouterLink to="/">首页</RouterLink> -->
        </el-menu-item>
        <el-menu-item index="/user">
          <span @click="router.push({path: '/user'})">用户页</span>
          <!-- <RouterLink to="/user">用户页</RouterLink> -->
        </el-menu-item>
        <el-sub-menu index="/user-competitions">
          <template #title>
            <span>codeforce</span>
          </template>
          <el-menu-item index="/rankings">
            <span @click="router.push({path: '/rankings'})">用户排名</span>
            <!-- <RouterLink to="/rankings">用户排名</RouterLink> -->
          </el-menu-item>
          <el-menu-item index="/contests">
            <span @click="router.push({path: '/contests'})">比赛列表</span>
            <!-- <RouterLink to="/contests">比赛列表</RouterLink> -->
          </el-menu-item>
          <el-menu-item index="/problems">
            <span @click="router.push({path: '/problems'})">题目列表</span>
            <!-- <RouterLink to="/problems">题目列表</RouterLink> -->
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/recommendation">
          <span @click="router.push({path: '/recommendation'})">智能推荐</span>
          <!-- <RouterLink to="/recommendation">智能推荐</RouterLink> -->
        </el-menu-item>
        <div class="flex-grow"></div>
        <el-menu-item index="/login" >
          <span @click="router.push({path: '/login'})">登录</span> 
          <!-- <RouterLink to="/login">登录</RouterLink> -->
        </el-menu-item>
        <el-menu-item index="/register">
          <span @click="router.push({path: '/register'})">注册</span>
          <!-- <RouterLink to="/register">注册</RouterLink> -->
        </el-menu-item>
      </el-menu>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>


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

.flex-grow {
  flex-grow: 1;
}
</style>
