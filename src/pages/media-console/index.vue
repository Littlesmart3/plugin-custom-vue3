<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
onBeforeMount(() => {
  // console.log('1.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  // console.log('2.-组件挂载到页面之后执行-------onMounted')
});
</script>
<template>
  <div class=""></div>
</template>

<style scoped lang="less">
//
</style>
