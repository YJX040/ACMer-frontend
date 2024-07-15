<template>
  <el-menu default-active="home" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
    @close="handleClose">
    <!-- 主页 -->
    <el-menu-item index="home" @click="goto('/')">
      <el-icon>
        <HomeFilled />
      </el-icon>
      <template #title>主页</template>
    </el-menu-item>

    <!-- Codeforces -->
    <el-sub-menu index="cf">
      <template #title>
        <el-icon>
          <Histogram />
        </el-icon>
        <span @click="goto('/cf')">Codeforces</span>
      </template>
      <el-menu-item index="contest" @click="goto('/cf/contest')">
        <el-icon>
          <ContestIcon></ContestIcon>
        </el-icon>
        <span>比赛</span>
      </el-menu-item>
      <el-menu-item index="cfproblem" @click="goto('/cf/problem')">
        <el-icon>
          <Avatar />
        </el-icon>
        <span>题目列表</span>
      </el-menu-item>
      <el-menu-item index="rank" @click="goto('/cf/rank')">
        <el-icon>
          <TrendCharts />
        </el-icon>
        <span>排名</span>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="user-total" @click="goto('/userlist')">
      <el-icon>
        <UserFilled />
      </el-icon>
      <template #title>用户概览</template>
    </el-menu-item>

    <!-- 训练 -->
    <el-menu-item index="train" @click="goto('/train')">
      <el-icon>
        <List />
      </el-icon>
      <template #title>训练</template>
    </el-menu-item>
    <!-- 管理 -->
    <el-sub-menu index="admin" v-if="!authStore.isGuest && authStore.isAdmin">
      <template #title>
        <el-icon>
          <Admin />
        </el-icon>
        <span @click="goto('/admin')">管理</span>
      </template>
      <el-menu-item index="amdinuser" @click="goto('/admin/user')">
        <el-icon>
          <AdminUser />
        </el-icon>
        <span>用户管理</span>
      </el-menu-item>
      <!-- <el-menu-item index="adminproblem" @click="goto('/admin/problem')">
        <el-icon>
          <AdminProblem />
        </el-icon>
        <span>题目管理</span>
      </el-menu-item> -->
    </el-sub-menu>

    <!-- 底部 -->
    <div class="flex-grow"></div>
    <!-- 用户 -->
    <el-menu-item v-if="authStore.isGuest" index="login" @click="goto('/login')">
      <el-icon>
        <LoginIcon />
      </el-icon>
      <template #title>登录</template>
    </el-menu-item>
    <el-menu-item v-else index="user" @click="goto('/user')">
      <el-icon>
        <UserFilled />
      </el-icon>
      <template #title>用户页</template>
    </el-menu-item>

    <!-- 登出按钮 -->
    <el-menu-item v-if="!authStore.isGuest" index="logout" @click="confirmLogout">
      <el-icon>
        <LogoutIcon />
      </el-icon>
      <template #title>登出</template>
    </el-menu-item>

    <el-menu-item @click="toggleCollapse" class="collapse-button">
      <el-icon v-if="isCollapse">
        <ExpandIcon />
      </el-icon>
      <el-icon v-else>
        <FoldIcon></FoldIcon>
      </el-icon>
      <template #title>伸缩</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { computed, defineEmits } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import LogoutIcon from '@/components/icon/LogoutIcon.vue';
import LoginIcon from '@/components/icon/LoginIcon.vue';
import ContestIcon from '@/components/icon/ContestIcon.vue';
import FoldIcon from '@/components/icon/FoldIcon.vue';
import ExpandIcon from '@/components/icon/ExpandIcon.vue';
import Admin from '@/components/icon/Admin.vue';
import AdminUser from '@/components/icon/AdminUser.vue';
import AdminProblem from '@/components/icon/AdminProblem.vue';
import { HomeFilled, Histogram, Avatar, TrendCharts, List, UserFilled } from '@element-plus/icons-vue';

const authStore = useAuthStore();
const router = useRouter();
const isCollapse = ref(false);

const emit = defineEmits(['collapse']);

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};

const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  emit('collapse', isCollapse.value);
};

const goto = (path) => {
  router.push(path);
};

const confirmLogout = () => {
  ElMessageBox.confirm('确定要登出吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    logout();
  }).catch(() => {
    // 取消操作
  });
};

const logout = () => {
  authStore.logout();
  ElMessage.success('登出成功');
  router.push('/');
};


onMounted(() => {
  // 页面加载时处理逻辑
});

</script>

<style scoped>
.collapse-button {
  display: flex;
  align-items: center;
}

.el-menu-vertical-demo {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
