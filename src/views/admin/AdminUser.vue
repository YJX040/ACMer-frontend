<template>
  <div class="user-management">
      <!-- <div class="clearfix">
        <span>用户管理</span>
      </div> -->
      <el-table :data="users" style="width: 100%"  >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="username" label="用户名">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.username }}</span>
            </template>
            <template v-else>
              <el-input v-model="row.username" size="small"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="真实姓名">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.name }}</span>
            </template>
            <template v-else>
              <el-input v-model="row.name" size="small"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="school" label="学校">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.school }}</span>
            </template>
            <template v-else>
              <el-input v-model="row.school" size="small"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="clazz" label="班级">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.clazz }}</span>
            </template>
            <template v-else>
              <el-input v-model="row.clazz" size="small"></el-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="auth" label="用户身份">
          <template #default="{ row }">
            <template v-if="!row.editing">
              <span>{{ row.auth }}</span>
            </template>
            <template v-else>
              <el-select v-model="row.auth" size="small">
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="用户" value="用户"></el-option>
              </el-select>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="cfRanking" label="积分">
          <template #default="{ row }">
          <el-tag v-if="row.cfRanking >= 2400" type="danger">
            {{ row.cfRanking }}
          </el-tag>
          <el-tag v-else-if="row.cfRanking >= 2100" type="warning">
            {{ row.cfRanking }}
          </el-tag>
          <el-tag v-else-if="row.cfRanking >= 1800" type="success">
            {{ row.cfRanking }}
          </el-tag>
          <el-tag v-else-if="row.cfRanking >= 1200" type="primary">
            {{ row.cfRanking }}
          </el-tag>
          <el-tag v-else type="info">
            {{ row.cfRanking }}
          </el-tag>
        </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <span style="color:#73b8ff; cursor: pointer;" v-if="!row.editing" @click="editUser(row)">编辑</span>
            <div class="editing" v-else>
              <span  style="color:#45A007; cursor: pointer;" @click="saveUser(row)">保存</span>
              <span  style="color:red; cursor: pointer;" @click="row.editing=false">取消</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <CustomPagination
        :current-page="currentPage"
        :total="total"
        :page-size="pageSize"
        @update:current-page="handleCurrentChange"
      />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import adminApi from '@/api/admin';
import CustomPagination from '@/components/CustomPagination.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);
const currentPage = ref(1);
const pageSize = ref(15);
const total = ref(0);

const fetchUsers = async () => {
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  };
  try {
    const res = await adminApi.getUserList(params);
    total.value = res.data.data.total;
    const rawData = res.data.data.items;
    for (let i = 0; i < rawData.length; i++) {
      // console.log('rawItem:', rawData[i]);
      for (const key in eachObj) {
        if (key == 'auth') {
          rawData[i][key] = rawData[i][key] === 0 ? '管理员' : '用户';
          continue;
        }
        if (rawData[i][key] === null || rawData[i][key] === undefined || rawData[i][key] === '') {
          rawData[i][key] = ' - ';
        }
        if (key == 'cfRanking') {
          rawData[i][key] = rawData[i][key] === ' - ' ? 0 : rawData[i][key];
        }
      }
    }
    users.value = res.data.data.items.map(user => ({
      ...user,
      editing: false  // 添加编辑状态字段，默认为false
    }));
    // ElMessage.success('数据获取成功');
  } catch (error) {
    // ElMessage.error('用户数据获取失败');
  }
};

const editUser = (row) => {
  row.editing = true; // 进入编辑状态
};

const eachObj = {
  id: -1,
  username: '',
  name: '',
  school: '',
  clazz: '',
  grade: '',
  award: '',
  auth: 0,
  cfRanking: 0
};

const saveUser = async (row) => {
  for (const key in eachObj) {
    if (row[key] === ' - ') {
      row[key] = '';
    }
  }
  //空数据不传过去，id是key字段，必须传
  const params = {
      id: row.id,
      username: row.username || '', // 如果为空，则传空字符串
      name: row.name || '',
      school: row.school || '',
      clazz: row.clazz || '',
      grade: row.grade || '', // 例如，这里的grade字段，如果为空则传空的字符串
      award: row.award || '', // award 字段
      auth: row.auth == "管理员" ? 0 : 1,
      cfRanking: row.cfRanking || 0 // cfRanking 字段
    };
  try {
    const res = await adminApi.changeUserList(params);
    ElMessage.success('用户信息保存成功');
    row.editing = false; // 保存成功后退出编辑状态
    fetchUsers(); // 保存成功后重新加载用户数据
  } catch (error) {
    // ElMessage.error('用户信息保存失败');
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

.editing {
  display: flex;
  justify-content: space-between;
  /* gap: 20px; */
  width: 70px;
}
</style>
