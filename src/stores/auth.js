
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
  const token = ref('');
  const auth = ref(IDENTIFICATION.GUSET); 
  const userId = ref(null);
  const username = ref('');
  const problemSets= ref([]);
  const problemCount = ref(0);
  const userCount = ref(0);

  const setToken = (newToken) => {
    token.value = newToken;
    try {
      const decoded = jwtDecode(newToken);
      auth.value = decoded.claims.auth;
      userId.value = decoded.claims.id;
      username.value = decoded.claims.username;
      console.log("is admin:", isAdmin.value);
    } catch (error) {
      console.error("Token解析失败:", error);
      auth.value = IDENTIFICATION.USER;
      userId.value = null;
      username.value = '';
      token.value = ''; 
    }
  };

  const logout = () => {
    token.value = ''; 
    auth.value = IDENTIFICATION.GUSET;
    userId.value = null;
    username.value = '';
  };



  const getToken = computed(() => token.value);

  const setProblemSets = (newProblemSets) => {
    problemSets.value = newProblemSets;
  }

  const getProblemSets = computed(() => problemSets.value);

  const getProblemSet = (id) => {
    return problemSets.value.find((problemSet) => problemSet.id === id);
  }
  
  const clearProblemSets = () => {
    problemSets.value = [];
  }
  const setProblemCount = (newProblemCount) => {
    problemCount.value = newProblemCount;
  }
  const getProblemCount = computed(() => problemCount.value);

const setUserCount = (newUserCount) => {
    userCount.value = newUserCount;
  }
  const getUserCount = computed(() => userCount.value);
  return {
    token,
    auth,
    isAdmin,
    isUser,
    isGuest,
    setToken,
    logout,
    IDENTIFICATION,
    getToken,
    setProblemSets,
    getProblemSets,
    clearProblemSets,
    getProblemSet,
    setProblemCount,
    getProblemCount,
    setUserCount,
    getUserCount,
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
