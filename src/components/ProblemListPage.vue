<template>
  <div class="problem-list-page">
    <el-table :data="filteredProblems" style="width: 100%;">
      <!-- 用户ID列 -->
      <el-table-column prop="userId" label="用户ID">
        <template #header>
          <div>用户ID</div>
          <el-input v-model="filter.userId" placeholder="用户ID" size="small" />
        </template>
      </el-table-column>
      <!-- 比赛类型列 -->
      <el-table-column prop="competitionType" label="比赛类型">
        <template #header>
          <div>比赛类型</div>
          <el-select v-model="filter.competitionType" placeholder="比赛类型" size="small">
            <el-option v-for="type in competitionTypes" :key="type" :label="type" :value="type"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <!-- 题目编号列 -->
      <el-table-column prop="problemNumber" label="题目编号">
        <template #header>
          <div>题目编号</div>
          <el-input v-model="filter.problemNumber" placeholder="题目编号" size="small" />
        </template>
      </el-table-column>
      <!-- 题目名称列 -->
      <el-table-column prop="problemName" label="题目名称" >
        <template #header>
          <div>题目名称</div>
          <el-input v-model="filter.problemName" placeholder="题目名称" size="small" />
        </template>
      </el-table-column>
      <!-- 题目难度列 -->
      <el-table-column prop="difficulty" label="题目难度" >
        <template #header>
          <div>题目难度</div>
          <el-slider v-model="filter.difficulty" :min="0" :max="4000" range size="small" />
        </template>
      </el-table-column>
      <!-- 题目标签列 -->
      <el-table-column prop="tags" label="题目标签" >
        <template #header>
          <div>题目标签</div>
          <el-select v-model="filter.tags" placeholder="题目标签" multiple size="small">
            <el-option v-for="tag in tags" :key="tag" :label="tag" :value="tag"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  name: 'ProblemListPage',
  data() {
    return {
      problems: [
        { userId: '123', competitionType: 'Type1', problemNumber: '001', problemName: 'Problem 1', difficulty: 2000, tags: ['tag1', 'tag2'] },
        { userId: '124', competitionType: 'Type2', problemNumber: '002', problemName: 'Problem 2', difficulty: 3000, tags: ['tag2', 'tag3'] },
        { userId: '125', competitionType: 'Type3', problemNumber: '003', problemName: 'Problem 3', difficulty: 1000, tags: ['tag1', 'tag3'] }
      ],
      tags: ['tag1', 'tag2', 'tag3'],
      competitionTypes: ['Type1', 'Type2', 'Type3'],
      filter: {
        userId: '',
        competitionType: '',
        problemNumber: '',
        problemName: '',
        difficulty: [0, 4000],
        tags: []
      }
    }
  },
  computed: {
    filteredProblems() {
      return this.problems.filter(problem => {
        return (
          (!this.filter.userId || problem.userId.includes(this.filter.userId)) &&
          (!this.filter.competitionType || problem.competitionType === this.filter.competitionType) &&
          (!this.filter.problemNumber || problem.problemNumber.includes(this.filter.problemNumber)) &&
          (!this.filter.problemName || problem.problemName.includes(this.filter.problemName)) &&
          (problem.difficulty >= this.filter.difficulty[0] && problem.difficulty <= this.filter.difficulty[1]) &&
          (this.filter.tags.length === 0 || this.filter.tags.some(tag => problem.tags.includes(tag)))
        )
      })
    }
  },
  created() {
    // 假数据用于测试，可以在API完成后替换
    // getProblems().then(response => {
    //   this.problems = response.data
    // })
  }
}
</script>

<style scoped>
.problem-list-page {
  padding: 20px;
}
</style>
