<template>
  <div class="demo-card">
    <t-card
      class="demo-card__item"
      v-for="i in componentsList"
      :key="i.key"
      :title="i.title"
      :bordered="i.bordered"
      hover-shadow
      @click="handleClickCard(i.routePath)"
    >
      <div class="demo-card__item-info">{{ i.infoMessage }}</div>
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
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  cursor: pointer;
  :deep(.t-card) {
    max-height: 200px;
    margin: 20px;
  }
  &__item {
    width: 300px;
    &-info {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      overflow: hidden;
      -webkit-box-orient: vertical;
    }
    &-link {
      margin-right: 10px;
      margin-top: 5px;
    }
  }
}
</style>
