<!-- CustomPagination.vue -->
<template>
  <el-pagination :current-page="modelValue" 
    :total="total"
    :page-size="pageSize"
    layout="total, prev, pager, next, jumper"
    background
    @current-change="handleCurrentChange" 
    class="pagination-bar"
    />
</template>

<script>
export default {
  props: {
    modelValue: Number,    
      total: Number,
        pageSize: Number
  },
emits: ['update:modelValue'],    
  methods: {
  handleCurrentChange(newPage) {
    this.$emit('update:modelValue', newPage);    
    }
}
}
</script>

<style scoped>
.pagination-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.el-pagination button.number,
.el-pagination button.prev,
.el-pagination button.next {
  margin: 0 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.el-pagination .el-pager li.active {
  background-color: #409EFF;
  border-color: #409EFF;
  color: #ffffff;
}
</style>
