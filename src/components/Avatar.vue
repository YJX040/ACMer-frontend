<template>
    <div class="avatar-wrapper">
        <span>{{ avatarString }}</span>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    avatar: {
        type: String,
        default: ''
    }
})

const avatarString = computed(() => {
    return props.avatar.charAt(0)
})
</script>

<style scoped>
.avatar-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #79bbff;
    color: #fff;
    font-size: 80px;
    font-weight: 500;
    overflow: hidden;
    user-select: none !important;
}

.avatar-wrapper span{
    -webkit-user-select: none;
}
</style>