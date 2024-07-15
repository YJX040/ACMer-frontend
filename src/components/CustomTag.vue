<template>
  <div>
    <!-- Handle multiple tags scenario -->
    <template v-if="Array.isArray(tags)">
      <el-tag v-for="tag in tags" :key="tag" :type="getTagType(tag)" style="margin-right: 5px;" :style="tagStyle">
        {{ tag }}
      </el-tag>
    </template>

    <!-- Handle single tag scenario -->
    <template v-else>
      <el-tag :type="getTagType(tags)" :style="tagStyle">
        {{ tags }}
      </el-tag>
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  tags: [Array, String], // Can be an array of tags or a single tag
  tagStyle: Object // Optional styling for tags
});

const getTagType = (tag) => {
  switch (tag) {
    case 'FINISHED':
      return 'success';
    case 'BEFORE':
      return 'warning';
    default:
      return 'info'; // Default tag type for general use, including multiple generic tags
  }
};
</script>

