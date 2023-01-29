<template>
  <div class="demo-card">
    <t-card
      class="demo-card__item"
      v-for="i in componentsList"
      :key="i.key"
      :title="i.title"
      :bordered="i.bordered"
      hover-shadow
      :style="{ width: '300px' }"
      @click="handleClickCard(i.routePath)"
    >
      {{ i.infoMessage }}
      <br />
      <a class="demo-card__item-link" :href="i.github">github</a>
      <a class="demo-card__item-link" :href="i.website">官网</a>
    </t-card>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const componentsList = [
  {
    key: 'Vue.Draggable',
    bordered: false,
    title: 'Vue.Draggable',
    routePath: '/vuedraggable',
    infoMessage: 'Vue.Draggable - 基于 Vue.js 丝般柔滑的拖拽排序组件',
    github: 'https://github.com/SortableJS/Vue.Draggable',
    website: 'https://sortablejs.github.io/Vue.Draggable/#/simple',
  },
];

function handleClickCard(path: string) {
  router.push({ path: path });
}
</script>
<style lang="less" scoped>
.demo-card {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background-color: var(--td-bg-color-container-hover);
  cursor: pointer;
  .demo-card__item-link {
    margin-right: 10px;
  }
}
</style>
