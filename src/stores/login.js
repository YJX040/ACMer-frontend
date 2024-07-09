// src/store/index.js

import { defineStore } from 'pinia';
import { ref } from 'vue'; // 引入 ref 函数

export const Loginstore = defineStore('login', () => {
  const islogin = ref(false);

  function login(){
    islogin.value = true;
  }

  function logout(){
    islogin.value = false;
  }

  return {
    islogin,
    login,
    logout
  };
});
