// src/stores/auth.js

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
  const IDENTIFICATION = {
    ADMIN: 0,
    USER: 1,
    GUSET: 2,
  };
  const isAdmin = computed(() => auth.value === IDENTIFICATION.ADMIN);
  const isUser = computed(() => auth.value === IDENTIFICATION.USER);
  const isGuest = computed(() => auth.value === IDENTIFICATION.GUSET);
  // const initialToken = localStorage.getItem('authToken') || '';
  const token = ref('');
  const auth = ref(IDENTIFICATION.GUSET); // 默认设置为普通用户
  const userId = ref(null);
  const username = ref('');

  const setToken = (newToken) => {
    token.value = newToken;
    try {
      const decoded = jwtDecode(newToken);
      // 根据解析结果设置身份
      auth.value = decoded.claims.auth;
      userId.value = decoded.claims.id;
      username.value = decoded.claims.username;
    } catch (error) {
      console.error("Token解析失败:", error);
      auth.value = IDENTIFICATION.USER; // 解析失败时，默认设置为普通用户身份
      userId.value = null;
      username.value = '';
      // localStorage.removeItem('authToken'); // 移除无效的 token
      token.value = ''; // 清空当前的 token
    }
  };

  const logout = () => {
    // localStorage.removeItem('authToken');
    token.value = ''; // 在登出时显式设为空字符串
    auth.value = IDENTIFICATION.GUSET;
    userId.value = null;
    username.value = '';
  };


  // // 添加浏览器关闭事件的处理
  // window.addEventListener('beforeunload', (event) => {
  //   // 防止触发刷新时的自动登出
  //   if (event.currentTarget.performance.navigation.type !== 1) {
  //     logout(); // 执行登出操作
  //   }
  // });

  const getToken = computed(() => token.value);

  return {
    token,
    auth,
    isAdmin,
    isUser,
    isGuest,
    setToken,
    logout,
    IDENTIFICATION,
    getToken
  };
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage,
      }
    ]
  }
});
