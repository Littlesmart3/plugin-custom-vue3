<script lang="ts" setup>
import { handleError, ref } from 'vue';
import TimeLine from './index.vue';
</script>
<template>
  <div class="layout">
    <TimeLine />
  </div>
</template>

<style scoped lang="less">
.layout {
  background-color: #131519;
  color: #fff;
}
</style>
