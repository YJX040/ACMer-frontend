<template>
    <div class="container">
        <Navbar />
        <div class="main">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/layout/Navbar.vue'
</script>

<style scoped>

</style>