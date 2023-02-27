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
      <a v-for="index in i.tags" :href="index.url" target="_blank" @click.stop="handleTagHref">
        <t-tag class="demo-card__item-link" shape="round">{{ index.name }}</t-tag>
      </a>
    </t-card>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { componentsList } from '@/config/componentsList';
const router = useRouter();

function handleClickCard(path: string) {
  router.push({ path: path });
}

function handleTagHref() {
  return;
}
</script>
<style lang="less" scoped>
.demo-card {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background-color: var(--td-bg-color-container-hover);
  cursor: pointer;
  :deep(.t-card) {
    max-height: 200px;
    margin: 20px;
  }
  .demo-card__item-link {
    margin-right: 10px;
    margin-top: 5px;
  }
}
</style>
