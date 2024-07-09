<template>
    <el-table :data="tableData" style="width: 100%">
  <!-- column-key用于指定列的唯一标识符 -->
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :sortable="col.sortable"
        :width="col.width"
        :column-key="col.columnKey" 
        :filters="col.filters"
        :filter-method="col.filterMethod"
        :formatter="col.formatter"
        :filter-placement="col.filterPlacement"
      > 
        <template v-if="col.slot" #default="scope">
          <component :is="col.slot" :scope="scope"></component>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
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
  
  const columns = computed(() => props.columns);
  const tableData = computed(() => props.tableData);
  </script>
  