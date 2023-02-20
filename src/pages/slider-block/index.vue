<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs';
const FragmentList = [
  {
    id: 1,
    children: [
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
    ],
  },
  {
    id: 2,
    children: [
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
    ],
  },
  {
    id: 3,
    children: [{ image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' }],
  },
  {
    id: 4,
    children: [
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
    ],
  },
];

const sliderRef = ref<HTMLElement>();
const timeLineRef = ref<HTMLElement>();
const fragmentRefs = ref<HTMLElement[]>();
const time = ref(0);
const timer = ref<NodeJS.Timer>();
const timeLineMouseStatus = ref<string>('');
const totalTime = 10000;
/** 单位长度的时间 */
const unitLengthOfTime = ref(0);
/** 每个片断长度 */
const fragmentWidth = ref<number[]>([]);

const fragmentRefsPosition = ref<[number, number][]>();

const activeFragmentItem = ref<HTMLElement>();

function fragmentItemClick(event: MouseEvent, index: number) {
  const ref = fragmentRefs.value?.[index] || undefined;
  if (timeLineRef.value && ref) timeLineRef.value.style.left = `${ref?.offsetLeft + event.offsetX}px`;
  // TODO:和下面一样，要抽出来写
  // const control = (left: number) => {
  //   const ref = activeFragmentItem.value;
  //   if (ref) {
  //     if (left >= ref.offsetLeft && left <= ref.offsetWidth + ref.offsetLeft) return true;
  //     else return false;
  //   }
  //   return false;
  // };
  // if (timeLineRef.value) {
  //   const offsetLeft = timeLineRef.value.offsetLeft || 0;
  //   const x = event.clientX - offsetLeft;
  //   const sliderDomWidth = timeLineRef.value.offsetWidth;
  //   if (sliderRef.value) {
  //     sliderRef.value.onmousemove = null;
  //     sliderRef.value.onmousemove = (e) => {
  //       const left = e.clientX - x;
  //       if (timeLineRef.value && control(left)) {
  //         timeLineRef.value.style.left = `${left + sliderDomWidth / 2}px`;
  //         lengthTurnTime(left, index);
  //       }
  //     };
  //   }
  //   document.addEventListener('mouseup', () => {
  //     if (sliderRef.value) sliderRef.value.onmousemove = null;
  //   });
  // }
}

function fragmentItemMouseover(e: MouseEvent, index: number) {
  const ref = fragmentRefs.value?.[index] || undefined;
  activeFragmentItem.value = ref;
  if (timeLineRef.value) {
    timeLineRef.value?.addEventListener('mousedown', (event) => {
      const control = (left: number) => {
        const ref = activeFragmentItem.value;
        if (ref) {
          if (left >= ref.offsetLeft && left <= ref.offsetWidth + ref.offsetLeft) return true;
          else return false;
        }
        return false;
      };
      if (timeLineRef.value) {
        const offsetLeft = timeLineRef.value.offsetLeft || 0;
        const x = event.clientX - offsetLeft;
        const sliderDomWidth = timeLineRef.value.offsetWidth;
        if (sliderRef.value) {
          sliderRef.value.onmousemove = null;
          sliderRef.value.onmousemove = (e) => {
            const left = e.clientX - x;
            if (timeLineRef.value && control(left)) timeLineRef.value.style.left = `${left + sliderDomWidth / 2}px`;
          };
        }
        document.addEventListener('mouseup', () => {
          if (sliderRef.value) sliderRef.value.onmousemove = null;
        });
      }
    });
  }
}

// 播放
function doMediaStatus(type: 'play' | 'pause') {
  if (type === 'play' && !timer.value)
    timer.value = setInterval(() => {
      if (time.value >= totalTime) {
        clearTimeout(timer.value);
        timer.value = undefined;
        time.value = 0;
      } else {
        time.value += 10;
      }
    }, 10);
  else if (type === 'pause') {
    clearTimeout(timer.value);
    timer.value = undefined;
  }
}

// 长度转时间
function lengthTurnTime(position: number, index: number) {
  time.value++;
}

// 时间转长度
function timeTurnLength() {}

const timeLinePosition = () => {};

// 当前时间
const currentTime = computed(() => dayjs(time.value).format('mm:ss:SSS'));
// 获取单位长度的时间
const getUnitLengthOfTime = () => {
  let totalWidth = 0;
  fragmentRefs.value?.forEach((element) => {
    totalWidth += element.offsetWidth;
    fragmentWidth.value.push(element.offsetWidth);
  });
  unitLengthOfTime.value = totalWidth / totalTime;
};

const init = () => {
  getUnitLengthOfTime();
};

onMounted(() => {
  init();
});
</script>
<template>
  <div class="slider-block" ref="sliderRef">
    <div class="slider-block__fragment" v-for="(item, index) in FragmentList" :key="index">
      <img src="https://oss.baoxiaohe.com/op/scripts/5f91dde40507f59027c18465868a02086838ddf2.png" alt="" />
      <div class="slider-block__fragment-content">
        <div
          ref="fragmentRefs"
          :fragmentKey="index"
          @mousedown="(e) => fragmentItemClick(e, index)"
          @mouseover="(e) => fragmentItemMouseover(e, index)"
        >
          <div class="slider-block__fragment-item" v-for="(element, index) in item.children">
            <img :src="element.image" />
            <p v-if="!(item.children.length === index + 1)" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div ref="timeLineRef" class="slider-block__time-line" @mousedown="handleTimeLine"> -->
    <div ref="timeLineRef" class="slider-block__time-line">
      <img src="https://oss.baoxiaohe.com/op/scripts/a5fa4f7b81f306e2ab675525d145d1772d192583.svg" alt="" />
    </div>
  </div>
  <br />
  <div class="btn-list">
    <div>当前时间：{{ currentTime }}</div>
    <button @click="doMediaStatus('play')">播放</button>
    <button @click="doMediaStatus('pause')">暂停</button>
  </div>
</template>

<style scoped lang="less">
.slider-block {
  position: relative;
  display: flex;
  padding: 10px;
  &__fragment {
    display: flex;
    margin-right: 10px;
    background-color: #9a9ca1;
    padding: 10px;
    border-radius: 5px;
    & > img {
      width: 10px;
      height: 30px;
      padding: 0 10px;
      -webkit-user-drag: none;
      -webkit-user-select: none;
    }
    &-content {
      & > div {
        position: relative;
        display: flex;
      }
    }
    &-item {
      display: flex;
      pointer-events: none;
      & > img {
        width: 60px;
        height: 60px;
        border-radius: 5px;
        -webkit-user-drag: none;
        -webkit-user-select: none;
      }
      & > p {
        height: 100%;
        width: 3px;
        margin: 0;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__time-line {
    position: absolute;
    left: 50px;
    cursor: ew-resize;
    img {
      margin-left: -6px;
      -webkit-user-drag: none;
      -webkit-user-select: none;
    }
  }
}
.btn-list {
  margin-left: 10px;
  & > button {
    margin-right: 20px;
    background-color: #70a1c4;
    color: #fff;
    border: unset;
    padding: 5px 10px;
    border-radius: 4px;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    cursor: pointer;
    &:active {
      border-color: #096dd9;
      background: #096dd9;
    }
  }
}
//
</style>
