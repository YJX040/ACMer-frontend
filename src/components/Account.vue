<template>
    <div class="account-wrapper" @click="handleClick" :class="isMain ? 'main-wrapper forbid' : 'sub-wrapper'">
        <div class="info" v-if="!isNull">
            <div class="account-line">
                <span>用户名: </span>
                <span>{{ handle }}</span>
            </div>
            <div class="account-line">
                <span>账户类型: </span>
                <span>{{ isMain ? "主账号" : "子账号" }}</span>
            </div>
        </div>
        <div class="control" v-if="!isNull" @click="emit('delete', handle)">
            <span>-</span>
        </div>
        <div class="info" v-else>
            <span>暂无账户</span>
        </div>
    </div>
    <div class="line" v-if="!isMain && !isLast"></div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    handle: {
        type: String,
        required: true
    },
    isMain: {
        type: Boolean,
        required: true
    },
    isLast: {
        type: Boolean,
        default: false
    },
    isNull: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['click:acc', 'delete']);

const handle = computed(() => props.handle)
const isMain = computed(() => props.isMain)
const isLast = computed(() => props.isLast)

const handleClick = () => {
    emit('click:acc', handle.value, isMain.value)
}
</script>

<style scoped>
.account-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 50px;
    height: 100px;
    width: 100%;
    /* border: #e5e5e52f solid 1px; */
    border-radius: 5px;
    font-size: 15px;
    cursor: pointer;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 80%;
}

.main-wrapper:hover {
    background-color: #b1b1b1 ;
    color: white;
}

.sub-wrapper:hover {
    background-color: #292828;
    color: rgb(255, 255, 255);
}

.line {
    border-bottom: 1px solid #e3e3e3;
    margin: auto;
    width: 90%;
}

.control {
    display: flex;
    justify-content: center;
    align-items: center;
    border: #e3e3e3 solid 1px;
    height: 25px;
    width: 25px;
    border-radius: 5px;
    font-size: 22px;
    color: #e3e3e3;
    cursor: pointer;
}

.control:hover {
    /* background-color: #E6AACE; */
    color: #E63946;
    border: #E63946 solid 1px;
}

.forbid {
    cursor: not-allowed;
    /* color: #e3e3e3; */
}
</style>