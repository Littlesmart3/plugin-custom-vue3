<script lang="ts" setup>
import { ref, watch, computed, nextTick } from 'vue';

interface IProps {
  /** 标签名称 */
  label: string;
  /** 值 */
  value: number;
  /** 单位 */
  unit?: string;
  /** 最小值，默认：0*/
  min?: number;
  /** 最大值，默认：100 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 组件高度 */
  height?: string;
}

const emit = defineEmits<(event: 'update:value', value: number) => void>();

const props = withDefaults(defineProps<IProps>(), {
  label: '长度',
  value: 2300,
  unit: '',
  min: 0,
  max: 100,
  step: 1,
  height: '28px',
});

// 滑块ref
const sliderRef = ref<HTMLElement>();
// 输入框ref
const inputRef = ref<HTMLInputElement>();
// 进度条
const progressWidth = computed(() => `${proportion.value * 100}%`);
// 比例
const proportion = ref(0);
// 是否编辑
const isEditor = ref(false);
//
let timeOut: NodeJS.Timeout | undefined = undefined;
// 活跃状态
const activeProgressStatus = ref(false);

// 双击
function handelDblclick() {
  clearTimeout(timeOut);
  isEditor.value = !isEditor.value;
  // 编辑状态下自动聚焦
  if (isEditor.value) {
    nextTick(() => {
      if (inputRef.value) inputRef.value.focus();
    });
  }
}

// 鼠标事件
function handleMouseEvent($event: MouseEvent) {
  const type = $event.type;
  // 鼠标按下事件
  if (type === 'mousedown') {
    const changeValueVoid = (e: MouseEvent) => {
      activeProgressStatus.value = true;
      const moveDistance = e.clientX - (sliderRef.value?.offsetLeft || 0);
      const offsetWidth = sliderRef.value?.offsetWidth || 0;
      const left = moveDistance < 0 ? 0 : moveDistance > offsetWidth ? offsetWidth : moveDistance;
      proportion.value = +(left / offsetWidth).toFixed(2);
      document.addEventListener('mouseup', cleanEventListener);
    };

    // 清除监听事件
    const cleanEventListener = () => {
      activeProgressStatus.value = false;
      document.removeEventListener('mouseup', cleanEventListener);
      document.removeEventListener('mousemove', changeValueVoid);
    };

    // 单词点击事件
    const onceClick = (e: MouseEvent) => {
      cleanEventListener();
      activeProgressStatus.value = true;
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        changeValueVoid(e);
        document.removeEventListener('mouseup', cleanEventListener);
      }, 500);
      sliderRef.value?.removeEventListener('mouseup', onceClick);
    };

    sliderRef.value?.addEventListener('mouseup', onceClick);
    document.addEventListener('mousemove', changeValueVoid);
  } else if (type === 'mouseover') {
    if (!activeProgressStatus.value) activeProgressStatus.value = true;
  } else if (type === 'mouseout') {
    if (activeProgressStatus.value) activeProgressStatus.value = false;
  }
}

// input事件
function handleChange($event: Event) {
  // 输入框change
  if ($event.type === 'input') {
    const value = +($event.target as HTMLInputElement).value;
    emit('update:value', value);
    valueTransform('valueToProgress', value);
  }
  // 输入框失焦
  else if ($event.type === 'blur') {
    isEditor.value = false;
    valueTransform('valueToProgress', props.value);
  }
  // 输入框聚焦
  else if ($event.type === 'focus') {
    ($event.currentTarget as HTMLInputElement).select();
  }
}

// input键盘事件
function inputKeyDown($event: KeyboardEvent) {
  if ($event.key === 'Enter') {
    isEditor.value = false;
  }
}

// 位置和值转换
function valueTransform(type: 'progressToValue' | 'valueToProgress', value: number) {
  const total = props.max - props.min;
  if (type === 'progressToValue') {
    const progress = total * value;
    emit('update:value', Math.round(progress));
  } else {
    proportion.value = +(value / total).toFixed(2);
  }
}

watch(
  () => proportion.value,
  (newValue) => {
    valueTransform('progressToValue', newValue);
  },
);
</script>
<template>
  <div
    v-if="!isEditor"
    class="bxh-slider"
    ref="sliderRef"
    @dblclick="handelDblclick"
    @mousedown="handleMouseEvent"
    @mouseover="handleMouseEvent"
    @mouseout="handleMouseEvent"
  >
    <div :class="['bxh-slider__progress', activeProgressStatus ? 'active' : 'null']" :style="{ width: progressWidth }" />
    <div class="bxh-slider__info">
      <span class="bxh-slider__info-title">{{ props.label }}</span>
      <span class="bxh-slider__info-title">{{ props.value }} {{ props.unit }}</span>
    </div>
  </div>
  <div class="bxh-slider" v-else @dblclick="handelDblclick">
    <input
      ref="inputRef"
      class="bxh-slider__input"
      type="number"
      :step="props.step"
      :value="props.value"
      @input="handleChange"
      @blur="handleChange"
      @focus="handleChange"
      @keydown="inputKeyDown"
    />
  </div>
</template>

<style lang="less" scoped>
.bxh-slider {
  position: relative;
  box-sizing: border-box;
  width: 230px;
  height: v-bind('props.height');
  border: 1px solid #31363f;
  border-radius: 2px;
  background-color: #131519;
  &__info {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    top: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    // pointer-events: none;
    padding: 0 10px;
    cursor: ew-resize;
    &-title {
      font-size: 12px;
      font-weight: 400;
      line-height: 1;
      color: #e5e5e6;
      user-select: none;
    }
  }
  &__progress {
    position: absolute;
    height: 100%;
    background-color: #22252c;
    transition: background-color 0.3s;
    &.active {
      background-color: #ff7714 !important;
    }
  }
  &__input {
    height: 100%;
    width: 100%;
    background-color: transparent;
    border: unset;
    color: #e5e5e6;
    text-align: center;
    vertical-align: middle;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
    &:focus-visible {
      outline: unset;
    }
  }
}
</style>
