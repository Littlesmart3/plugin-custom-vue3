<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';

// const project = getProject('My Project');

// 初始化
const init = () => {
  studio.initialize();
};

onBeforeMount(() => {
  init();
  // console.log('1.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  // console.log('project', project);
  // console.log('2.-组件挂载到页面之后执行-------onMounted')
});
</script>
<template>
  <div class="">123</div>
</template>

<style scoped lang="less">
//
</style>
