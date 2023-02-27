<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Demo3Component from './demo3/index.vue';

const route = useRoute();
const router = useRouter();

// 模块列表
const componentsList = [{ name: 'demo3', element: Demo3Component }];
const componentsNameList = componentsList.map((i) => i.name);

const demoId = computed(() => route.params?.demoId as string);

const activeComponent = computed(() => {
  const component = componentsList.find((i) => i.name === demoId.value);
  return component?.element ? component : componentsList[0];
});
onBeforeMount(() => {
  if (!componentsNameList.includes(demoId.value)) router.push(`/gsap-case/${componentsNameList[0]}`);
});
</script>
<template>
  <div class="">
    <component :is="activeComponent.element" />
  </div>
</template>

<style scoped lang="less">
//
</style>
