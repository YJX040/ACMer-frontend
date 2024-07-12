<template>
    <div class="user-management">
      <el-card>
        <div class="clearfix">
          <span>用户管理</span>
          <el-button type="primary" @click="addUser" class="float-right">新增用户</el-button>
        </div>
        <el-table :data="users" style="width: 100%">
          <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label">
            <template v-if="col.prop === 'actions'">
              <el-button @click="editUser(row)" size="mini">编辑</el-button>
              <el-button @click="deleteUser(row)" type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import router from '@/router';
  import api from '@/api';
  
  const columns = [
    { prop: 'id', label: 'ID' },
    { prop: 'username', label: '用户名' },
    { prop: 'role', label: '角色' },
    { prop: 'actions', label: '操作' }
  ];
  
  const users = ref([]);
  
  const fetchUsers = async () => {
    try {
      const res = await api.getUsers();
      users.value = res.data;
    } catch (error) {
      ElMessage.error('用户数据获取失败');
    }
  };
  
  const addUser = () => {
    router.push('/admin/adduser');
  };
  
  const editUser = (user) => {
    router.push({ path: '/users/edit', query: { id: user.id } });
  };
  
  const deleteUser = async (user) => {
    try {
      await api.deleteUser(user.id);
      ElMessage.success('用户删除成功');
      fetchUsers();
    } catch (error) {
      ElMessage.error('用户删除失败');
    }
  };
  
  onMounted(fetchUsers);
  </script>
  
  <style scoped>
  .user-management {
    padding: 20px;
  }
  .float-right {
    float: right;
  }
  </style>
  