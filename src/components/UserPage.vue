<template>
  <div class="user-page">
    <el-table :data="users">
      <el-table-column prop="rank" label="排名"  />
      <el-table-column prop="school" label="学校"  />
      <el-table-column prop="class" label="班级"  />
      <el-table-column prop="grade" label="年级" />
      <el-table-column prop="realName" label="真实姓名"  />
      <el-table-column prop="award" label="奖项"  />
      <el-table-column prop="username" label="用户名"  />
      <el-table-column prop="userStatus" label="用户状态"  />
      <el-table-column prop="cf" label="cf"  />
      <el-table-column prop="numCf" label="#cf"  />
      <el-table-column prop="cfPlus" label="cf+" />
      <el-table-column prop="cfPlusPlus" label="cf++"  />
    </el-table>
  </div>
</template>

<script>
import { getUserData } from '../api'

export default {
  name: 'UserPage',
  data() {
    return {
      users: []
    }
  },
  created() {
    getUserData().then(response => {
      this.users = response.data
    })
  }
}
</script>

<style scoped>
.user-page {
  padding: 20px;
}
</style>
