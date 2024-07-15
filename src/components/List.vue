<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" :sortable="col.sortable"
      :width="col.width" :column-key="col.columnKey" :filters="col.filters" :filter-method="col.filterMethod"
      :formatter="col.formatter" :filter-placement="col.filterPlacement">
      <template #default="scope">
        <component v-if="col.slot" :is="col.slot" :scope="scope"></component>
        <span v-else-if="col.prop === 'user'">{{ scope.row.user.username }}</span>
        <span v-else-if="col.prop === 'accountType'">
          <!-- 子账号0 -->
          <el-tag v-if="scope.row.accountType === 0" type="success">子账号</el-tag>
          <!-- 主账号1 -->
          <el-tag v-else-if="scope.row.accountType === 1" type="info">主账号</el-tag>
        </span>
        <span v-else-if="col.prop === 'startTimeSeconds'">{{ formatTime(scope.row, col, scope.row[col.prop]) }}</span>
        <span v-else-if="col.prop === 'durationSeconds'">{{ formatDuration(scope.row, col, scope.row[col.prop])
          }}</span>
        <span v-else-if="col.prop === 'relativeTimeSeconds'">{{ formatDuration(scope.row, col, scope.row[col.prop])
          }}</span>
        <span v-else-if="col.prop === 'tags' || col.prop === 'phase'">
          <CustomTag :tags="scope.row[col.prop]" />
        </span>
        <span v-else>{{ scope.row[col.prop] }}</span>
        <!-- <slot :name="col.prop" :row="scope.row" :column="scope.column" :cellValue="scope.cellValue">
          {{ scope.row[col.prop] }}
        </slot> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  tableData: {
    type: Array,
    required: true,
  },
});


// 格式化时间戳
const formatTime = (row, column, cellValue) => {
  if (!cellValue) return '';
  const date = new Date(cellValue * 1000);
  return date.toLocaleString();
};

// 格式化持续时间
const formatDuration = (row, column, cellValue) => {
  if (!cellValue) return '';
  if (cellValue < 0) {
    const days = Math.abs(Math.floor(cellValue / (24 * 3600)));
    return `${days}天后`;
  }
  if (cellValue < 3600) {
    const minutes = Math.floor(cellValue / 60);
    return `${minutes}分钟`;
  }
  if (cellValue < 86400) {
    const hours = Math.floor(cellValue / 3600);
    return `${hours}小时`;
  }
  if (cellValue > 365 * 24 * 3600) {
    const years = Math.floor(cellValue / (365 * 24 * 3600));
    return `${years}年前`;
  }
  const days = Math.floor(cellValue / (24 * 3600));
  return `${days}天`;
};


const columns = computed(() => props.columns);
const tableData = computed(() => props.tableData);

// Watch the props to debug and ensure they are received correctly
watch(
  () => props.columns,
  (newColumns) => {
    console.log('Received columns:', newColumns);
  },
  { immediate: true }
);

watch(
  () => props.tableData,
  (newTableData) => {
    console.log('Received tableData:', newTableData);
  },
  { immediate: true }
);

</script>

<style scoped>
/* 添加必要的样式 */
</style>
