<template>
  <div class="user-management">
    <el-card>
      <div class="clearfix">
        <span>CF用户管理</span>
      </div>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="handle" label="用户名">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.handle }}</span>
            </template>
            <template v-else>
              <el-input v-model="row.handle" size="mini"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="country" label="国家"></el-table-column>
        <el-table-column prop="organization" label="组织"></el-table-column>
        <el-table-column prop="contribution" label="贡献值"></el-table-column>
        <el-table-column prop="rank" label="等级"></el-table-column>
        <el-table-column prop="rating" label="评分"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button @click="confirmDelete(row.handle)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <CustomPagination :current-page="currentPage" :total="total" :page-size="pageSize"
      @update:current-page="handleCurrentChange" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import adminApi from '@/api/admin';
import CustomPagination from '@/components/CustomPagination.vue';

const users = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
let deleteUserhandle = '';

const fetchUsers = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  };
  try {
    const res = await adminApi.getCFList(params);
    users.value = res.data.data.items.map(user => ({
      ...user
    }));
    total.value = res.data.data.total;
  } catch (error) {
    ElMessage.error('用户数据获取失败');
  }
};

const confirmDelete = (handle) => {
  deleteUserhandle = handle;
  ElMessageBox.confirm(`确定要删除吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteUser();
  }).catch(() => {
    // 用户取消，不进行任何操作
  });
};

const deleteUser = async () => {
  const params = {
    handle: deleteUserhandle,
  };
  try {
    const res = await adminApi.deleteCFList(params);
    ElMessage.success('用户删除成功');
    fetchUsers(); // Reload user list after successful deletion
  } catch (error) {
    ElMessage.error('用户删除失败');
  }
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchUsers();
};

onMounted(fetchUsers);
</script>

<style scoped>
.user-management {
  padding: 20px;
}
</style>
