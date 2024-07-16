<template>
    <div class="account-container">
        <div class="main-account">
            <Account @click:acc="handleAccountClick" @delete="handleDelete" :handle="mainAccount.handle" :is-main="true"
                :is-null="mainNull" />
        </div>
        <div class="other-account">
            <div class="wrapper" v-if="!subNull">
                <Account @click:acc="handleAccountClick" @delete="handleDelete" v-for="item in subAccount"
                    :key="item.handle" :handle="item.handle" :is-main="false"
                    :is-last="subAccount.indexOf(item) == subAccount.length - 1" :is-null="subNull" />
            </div>
            <div class="wrapper" v-else>
                <Account :is-null="true"></Account>
            </div>
        </div>
        <div class="tool-box">
            <div class="add-btn" @click="handleAdd">+</div>
        </div>
    </div>

    <el-dialog v-model="addVisible" title="添加账户" width="250" center modal>
        <el-form style="margin-top: 20px;" :v-model="form">
            <el-form-item label="账户名">
                <el-input v-model="form.newHandle" placeholder="请输入账户名"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    添加
                </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="delVisible" title="提醒" width="250" modal>
        <div class="dialog-content">
            <span>正在删除账号 <span style="font-weight: 800;">{{ tobeDel }}</span></span>
            <span>确认删除？</span>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleDelCancel">取消</el-button>
                <el-button type="primary" @click="handleDelConfirm">
                    删除
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import Account from "@/components/Account.vue"
import { computed, ref, reactive } from 'vue';

const props = defineProps({
    account: {
        type: Object,
        default: {
            mainAccount: {
                type: Object,
                default: null
            },
            subAccount: {
                type: Array,
                default: []
            }
        },
        // required: true
    }
})

const emit = defineEmits(['add:account', 'remove:account', 'set:main']);

const mainAccount = computed(() => props.account.mainAccount);
const mainNull = computed(() => props.account.mainAccount === null || props.account.mainAccount === undefined);
const subAccount = computed(() => props.account.subAccount);
const subNull = computed(() => props.account.subAccount === null || props.account.subAccount === undefined || props.account.subAccount.length === 0);

const addVisible = ref(false);
const delVisible = ref(false);
const form = reactive({
    newHandle: ''
});
const tobeDel = ref('');

const handleAccountClick = (handle, isMain) => {
    if (!isMain) {
        emit('set:main', handle);
    }
}

const handleDelete = (handle) => {
    // emit('remove:account', handle);
    tobeDel.value = handle;
    delVisible.value = true;
}

const handleAdd = () => {
    // emit('add:account');
    addVisible.value = true;
}

const handleCancel = () => {
    addVisible.value = false;
    form.newHandle = '';
}

const handleConfirm = () => {
    if (form.newHandle === '') {
        ElMessage({
            message: '账户名不能为空',
            // grouping: true,
            type: 'warning',
        })
        return;
    }
    addVisible.value = false;
    emit('add:account', form.newHandle);
    form.newHandle = '';
}

const handleDelCancel = () => {
    delVisible.value = false;
    tobeDel.value = ''
}

const handleDelConfirm = () => {
    delVisible.value = false;
    emit('remove:account', tobeDel.value);
    tobeDel.value = ''
}
</script>

<style scoped>
.account-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    border:#dfdede  solid 1px;
    border-radius: 5px;
    padding: 0 0 5px 0;
}

.main-account {
    border: #dfdede  solid 1px;
    border-radius: 5px;
    height: 100px;
    margin-bottom: 5px;
    box-shadow: none;
}

.other-account {
    display: flex;
    flex-direction: column;
    border: #dfdede  solid 1px;
    border-radius: 5px;
    min-height: 0;
    max-height: 300px;
    overflow-y: auto;
    box-shadow: none;
}

.tool-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: none;
    padding: 5px 10px 0 0;

}

.add-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: #d5d5d5 solid 1px; */
    height: 25px;
    width: 25px;
    border-radius: 5px;
    font-size: 22px;
    cursor: pointer;
    color: #3c3c3c ;
}

.add-btn:hover {
    /* background-color: #c4f0c570; */
    color: #dfdede ;
}


.dialog-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

/* 滚动槽 */
::-webkit-scrollbar {
    width: 3px;
    height: 6px;
}

::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(130, 122, 122, 0.08);
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>