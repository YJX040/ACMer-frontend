<!-- CustomTag.vue -->
<template>
  <el-tag :type="scope.row.tag === 'CF' ? '' : 'success'" disable-transitions>
    {{ scope.row.tag }}
  </el-tag>
</template>

<script>
export default {
  name: 'CustomTag',
  props: {
    scope: {
      type: Object,
      required: true
    }
  }
};
</script>