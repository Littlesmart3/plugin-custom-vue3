<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, VNodeRef } from 'vue';
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
      { image: 'https://miro.medium.com/max/720/1*krRRJJmQ6p5kLI8WKybUMg.webp' },
    ],
  },
];

const sliderRef = ref<HTMLElement>();
const timeLineRef = ref<HTMLElement>();
const fragmentRefs = ref<HTMLElement[]>();

const timeLineMouseStatus = ref<string>('');

const fragmentRefsPosition = ref<[number, number][]>();

const endTimeList = computed(() => {
  return fragmentRefs.value?.map((i) => {
    console.log('i', i);
  });
});

const activeFragmentItem = ref<HTMLElement>();

function fragmentItemMouseEvent(event: MouseEvent, index: number) {
  const fatherDom = sliderRef.value;
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
    // ref?.addEventListener('click', (event) => {
    //   const offsetLeft = timeLineRef.value?.offsetLeft || 0;
    //   const x = event.clientX - offsetLeft;
    //   const sliderDomWidth = timeLineRef.value?.offsetWidth;
    //   if (timeLineRef.value && sliderDomWidth) {
    //     console.log(event.clientX, offsetLeft, ref.offsetLeft);
    //     // timeLineRef.value.style.left = `${x + sliderDomWidth / 2}px`;
    //   }
    // });
  }

  // // 超出边界处理
  // const control = (dom: HTMLElement | undefined, left: number) => {
  //   if (dom && (dom?.offsetLeft + left > dom?.offsetWidth || dom?.offsetLeft + left < 0)) return false;
  //   return true;
  // };
  // if (timeLineRef.value) {
  //   timeLineRef.value?.addEventListener('mousedown', (event) => {
  //     const offsetLeft = timeLineRef.value?.offsetLeft || 0;
  //     const x = event.clientX - offsetLeft;
  //     // const x = timeLineRef.value?.clientWidth || 0 - offsetLeft;
  //     // console.log('x', timeLineRef.value?.offsetLeft);

  //     if (sliderRef.value) {
  //       sliderRef.value.onmousemove = (e) => {
  //         const left = e.clientX - x - 40;
  //         const sliderDomWidth = timeLineRef.value?.offsetWidth;
  //         if (timeLineRef.value) {
  //           // if (control(ref, left)) timeLineRef.value.style.left = `${left + 40 + (sliderDomWidth || 0) / 2}px`;
  //         }
  //       };
  //       // sliderRef.value.onmouseout = () => {
  //       //   if (sliderRef.value) sliderRef.value.onmousemove = null;
  //       // };
  //     }
  //     // if (sliderRef.value) {
  //     //   sliderRef.value.onmousemove = (e) => {
  //     //     const left = e.clientX - x - 40;
  //     //     const sliderDomWidth = timeLineRef.value?.offsetWidth;
  //     //     // if (ref?.onmouseout) ref?.onmouseout(() => {});
  //     //     if (timeLineRef.value) {
  //     //       if (control(ref, left)) timeLineRef.value.style.left = `${left + 40 + (sliderDomWidth || 0) / 2}px`;
  //     //     }
  //     //   };
  //     //   sliderRef.value.onmouseup = () => {
  //     //     if (sliderRef.value) sliderRef.value.onmousemove = null;
  //     //   };
  //     // }
  //   });
  //   timeLineRef.value?.addEventListener('mouseup', (event) => {
  //     console.log(123);

  //     timeLineRef.value?.removeEventListener('mousedown', () => {
  //       console.log(123);
  //     });
  //   });
  // }

  // if (timeLineMouseStatus.value === 'mousedown') console.log('event', timeLineMouseStatus.value, event);

  // timeLineRef.value?.addEventListener('mousedown', (event) => {
  //   const offsetLeft = timeLineRef.value?.offsetLeft || 0;
  //   const x = event.clientX - offsetLeft;
  //   if (sliderRef.value) {
  //     sliderRef.value.onmousemove = (event) => {
  //       const left = `${event.clientX - x}px`;
  //       if (timeLineRef.value) {
  //         // if (control()) timeLineRef.value.style.left = left;
  //         // console.log('event', event);
  //         timeLineRef.value.style.left = left;
  //       }
  //     };
  //     sliderRef.value.onmouseup = () => {
  //       if (sliderRef.value) sliderRef.value.onmousemove = null;
  //     };
  //   }
  // });
}

// 时间针鼠标事件
function timeLineDrag(e: MouseEvent) {
  console.log('e.type', e);
}

function handleTimeLine(event: MouseEvent) {
  const control = (left: number) => {
    const ref = activeFragmentItem.value;
    if (ref) {
      if (left >= ref.offsetLeft && left <= ref.offsetWidth + ref.offsetLeft) return true;
      else return false;
    }
    return false;
  };
  if (timeLineRef.value) {
    const offsetLeft = timeLineRef.value?.offsetLeft || 0;
    const x = event.clientX - offsetLeft;
    const sliderDomWidth = timeLineRef.value?.offsetWidth;
    if (sliderRef.value) {
      sliderRef.value.onmousemove = (e) => {
        const left = e.clientX - x;
        if (timeLineRef.value && control(left)) timeLineRef.value.style.left = `${left - sliderDomWidth / 2}px`;
      };
    }
    document.addEventListener('mouseup', () => {
      if (sliderRef.value) sliderRef.value.onmousemove = null;
    });
  }
}

onMounted(() => {
  // timeLineDrag();
});
</script>
<template>
  <div class="slider-block" ref="sliderRef">
    <div class="slider-block__fragment" v-for="(item, index) in FragmentList" :key="index">
      <img src="https://oss.baoxiaohe.com/op/scripts/5f91dde40507f59027c18465868a02086838ddf2.png" alt="" />
      <div class="slider-block__fragment-content">
        <div ref="fragmentRefs" :fragmentKey="index" @mouseover="(e) => fragmentItemMouseEvent(e, index)">
          <div class="slider-block__fragment-item" v-for="(element, index) in item.children">
            <img :src="element.image" />
            <p v-if="!(item.children.length === index + 1)" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div ref="timeLineRef" class="slider-block__time-line" @mousedown="handleTimeLine"> -->
    <div ref="timeLineRef" class="slider-block__time-line" @mousedown="handleTimeLine">
      <img src="https://oss.baoxiaohe.com/op/scripts/a5fa4f7b81f306e2ab675525d145d1772d192583.svg" alt="" />
    </div>
  </div>
</template>

<style scoped lang="less">
.slider-block {
  position: relative;
  display: flex;
  padding: 10px;
  &__fragment {
    // position: relative;
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
    }
    &-content {
      // position: relative;
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
    }
  }
}
//
</style>
