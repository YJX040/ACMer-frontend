<script setup>
import { RouterView } from 'vue-router';
import Navbar from '@/layout/Navbar.vue'
</script>

<template>
  <header>
    <div>
      <Navbar />
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
</style>
