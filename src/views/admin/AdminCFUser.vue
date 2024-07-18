<template>
  <div class="user-management">
    <!-- <div class="clearfix">
      <span>CF用户管理</span>
    </div> -->
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
      <!-- <el-table-column prop="contribution" label="贡献值"></el-table-column> -->
      <el-table-column prop="rank" label="等级"></el-table-column>
      <el-table-column prop="rating" label="积分">
        <template #default="{ row }">
          <el-tag v-if="row.rating >= 2400" type="danger">
            {{ row.rating }}
          </el-tag>
          <el-tag v-else-if="row.rating >= 2100" type="warning">
            {{ row.rating }}
          </el-tag>
          <el-tag v-else-if="row.rating >= 1800" type="success">
            {{ row.rating }}
          </el-tag>
          <el-tag v-else-if="row.rating >= 1200" type="primary">
            {{ row.rating }}
          </el-tag>
          <el-tag v-else type="info">
            {{ row.rating }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <span style="color:red; cursor: pointer;" @click="confirmDelete(row.handle)" type="danger"
            size="mini">删除</span>
        </template>
      </el-table-column>
    </el-table>
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
const pageSize = ref(15);
const total = ref(0);
let deleteUserhandle = '';

const eachObj = {
  id: -1,
  handle:'',
  country: '',
  organization: '',
  rank: '',
  rating: '',
}


const fetchUsers = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  };
  try {
    const res = await adminApi.getCFList(params);
    const rawData = res.data.data.items;
    for (let i = 0; i < rawData.length; i++) {
      for (const key in eachObj) {
        if (rawData[i][key] === null || rawData[i][key] === undefined || rawData[i][key] === '') {
          rawData[i][key] = ' - ';
        }
        if (key == 'rating') {
          rawData[i][key] = rawData[i][key] === ' - ' ? 0 : rawData[i][key];
        }
      }
    }
    users.value = rawData;
    // users.value = res.data.data.items.map(user => ({
    //   ...user
    // }));
    total.value = res.data.data.total;
  } catch (error) {
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
    // ElMessage.error('用户删除失败');
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
