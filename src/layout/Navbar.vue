<template>
  <el-menu default-active="home" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
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
      <el-menu-item index="cfUser" @click="goto('/cf/user')">
        <el-icon>
          <Avatar />
        </el-icon>
        <span>Codeforces 用户</span>
      </el-menu-item>
      <el-menu-item index="rank" @click="goto('/cf/rank')">
        <el-icon>
          <TrendCharts />
        </el-icon>
        <span>排名</span>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="user-total" @click="goto('/user')">
      <el-icon>
        <UserFilled />
      </el-icon>
      <template #title>用户</template>
    </el-menu-item>

    <!-- 训练 -->
    <el-menu-item index="train" @click="goto('/train')">
      <el-icon>
        <List />
      </el-icon>
      <template #title>训练</template>
    </el-menu-item>
    <!-- 底部 -->
    <div class="flex-grow"></div>
    <!-- 用户 -->
    <el-menu-item v-if="!isLoggedin" index="login" @click="goto('/login')">
      <el-icon><LoginIcon /></el-icon>
      <template #title>登录</template>
    </el-menu-item>
    <el-menu-item v-else index="user" @click="goto('/user')">
      <el-icon>
        <UserFilled />
      </el-icon>
      <template #title>用户页</template>
    </el-menu-item>

    <!-- 登出按钮 -->
    <el-menu-item v-if="isLoggedin" index="logout" @click="confirmLogout">
      <el-icon><LogoutIcon/></el-icon>
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
import { Loginstore } from '@/stores/login';
import { ref , onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { computed, defineEmits } from 'vue';
import { Location, HomeFilled, DArrowLeft, DArrowRight, Histogram, EditPen, Avatar, TrendCharts, List, UserFilled, WarnTriangleFilled,CloseBold  } from '@element-plus/icons-vue';
import LogoutIcon from '@/components/icon/LogoutIcon.vue';
import LoginIcon from '@/components/icon/LoginIcon.vue';
import ContestIcon from '@/components/icon/ContestIcon.vue';
import FoldIcon from '@/components/icon/FoldIcon.vue';
import ExpandIcon  from '@/components/icon/ExpandIcon.vue';
const store = Loginstore();
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

// 确认登出方法
const confirmLogout = () => {
  ElMessageBox.confirm('确定要登出吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 用户点击确定按钮后执行登出操作
    logout();
  }).catch(() => {
    // 用户点击取消按钮时的操作
  });
};

const logout = () => {
  store.logout(); // 调用 Pinia Store 中的登出方法
  localStorage.setItem('isLoggedIn', 'false'); // 将登录状态保存到 localStorage
  ElMessage.success('登出成功');
  router.push('/'); // 跳转到登录页
};

// 从 Pinia Store 中获取登录状态
const isLoggedin = computed(() => store.islogin);

// 在页面加载时从 localStorage 恢复登录状态
onMounted(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    store.login(); // 更新 Pinia Store 中的登录状态为 true
  } else {
    store.logout(); // 可选：确保状态一致性，如果 localStorage 中没有登录状态，强制登出
  }
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
