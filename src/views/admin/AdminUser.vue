<template>
  <div class="user-management">
    <el-card>
      <div class="clearfix">
        <span>用户管理</span>
      </div>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="用户名">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.username }}</span>
            </template>
            <template v-else>
              <el-input v-model="row.username" size="mini"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="真实姓名">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.name }}</span>
            </template>
            <template v-else>
              <el-input v-model="row.name" size="mini"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="school" label="学校">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.school }}</span>
            </template>
            <template v-else>
              <el-input v-model="row.school" size="mini"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="clazz" label="班级">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.clazz }}</span>
            </template>
            <template v-else>
              <el-input v-model="row.clazz" size="mini"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="auth" label="用户身份">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.auth === 0 ? '管理员' : '用户' }}</span>
            </template>
            <template v-else>
              <el-select v-model="row.auth" size="mini">
                <el-option label="管理员" value="0"></el-option>
                <el-option label="用户" value="1"></el-option>
              </el-select>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="cfRanking" label="积分">
          <template #default="{ row }">
            <span>{{ row.cfRanking }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button v-if="!row.editing" @click="editUser(row)" size="mini">编辑</el-button>
            <el-button v-else @click="saveUser(row)" type="success" size="mini">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <CustomPagination
        :current-page="currentPage"
        :total="total"
        :page-size="pageSize"
        @update:current-page="handleCurrentChange"
      />
    </el-card>
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

const fetchUsers = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  };
  try {
    const res = await adminApi.getUserList(params);
    users.value = res.data.data.items.map(user => ({
      ...user,
      editing: false  // 添加编辑状态字段，默认为false
    }));
    total.value = res.data.data.total;
  } catch (error) {
    ElMessage.error('用户数据获取失败');
  }
};

const editUser = (row) => {
  row.editing = true; // 进入编辑状态
};

const saveUser = async (row) => {
  //空数据不传过去，id是key字段，必须传
  const params = {
      id: row.id,
      username: row.username || '', // 如果为空，则传空字符串
      name: row.name || '',
      school: row.school || '',
      clazz: row.clazz || '',
      grade: row.grade || '', // 例如，这里的grade字段，如果为空则传空的字符串
      award: row.award || '', // award 字段
      auth: row.auth || 0, // auth 字段
      cfRanking: row.cfRanking || 0 // cfRanking 字段
    };
  try {
    const res = await adminApi.changeUserList(params);
    ElMessage.success('用户信息保存成功');a
    row.editing = false; // 保存成功后退出编辑状态
  } catch (error) {
    ElMessage.error('用户信息保存失败');
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
.float-right {
  float: right;
}
</style>
