<script lang="ts" setup>
import { computed, ref } from 'vue';
import MediaConsole from './index.vue';

const containerRef = ref<HTMLElement>();
</script>
<template>
  <div class="layout">
    <div ref="containerRef" class="container">
      <MediaConsole v-if="containerRef" :containerRef="containerRef" />
    </div>
  </div>
</template>

<style scoped lang="less">
.layout {
  color: #fff;
  background-color: #31363f;
  .container {
    width: 1000px;
    overflow: auto;
  }
}
</style>
