<script lang="ts" setup>
import { ref } from 'vue';
import BxhSlider from './index.vue';

const value = ref(0);
</script>
<template>
  <div class="layout">
    <BxhSlider label="长度" v-model:value="value" unit="mm" :min="0" :max="100" />
  </div>
</template>

<style scoped lang="less">
.layout {
  background-color: #131519;
}
</style>
