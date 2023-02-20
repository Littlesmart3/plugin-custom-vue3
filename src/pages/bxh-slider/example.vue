<script lang="ts" setup>
import { handleError, ref } from 'vue';
import BxhSlider from './index.vue';

const value = ref(0);

const handleError = (msg: string) => {
  console.log(msg);
};
</script>
<template>
  <div class="layout">
    <BxhSlider label="长度" v-model:value="value" unit="mm" :min="0" :max="100" @error="handleError" />
  </div>
</template>

<style scoped lang="less">
.layout {
  background-color: #131519;
}
</style>
