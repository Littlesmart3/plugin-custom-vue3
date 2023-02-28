<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

import { DraggableDivX } from './utils';
import { media } from './config';

interface IProps {
  containerRef: HTMLElement;
}

const props = defineProps<IProps>();

const processHandler = 'https://oss.baoxiaohe.com/op/scripts/533a57bddc44160221d84fb8da5291b259a92a72.svg';

const activeFragmentSort = ref(1);

const videoFragmentList = ref<any>();

const mainTrackRef = ref<HTMLElement>();

// 是否在拖拽
const drag = ref(false);

const processRef = ref<HTMLElement>();
const handleTrackItem = ($event: MouseEvent, sort: number) => {
  activeFragmentSort.value = sort;
};

const handleVueDraggable = ($event: any, type: 'start' | 'choose' | 'unchoose' | 'end') => {
  drag.value = type === 'start' ? true : false;

  // if (type === 'choose') {
  //   console.log('$event', $event);
  // } else if (type === 'start') {
  //   console.log('mainTrackRef', mainTrackRef.value);
  //   // console.log($event);
  // }
};

onMounted(() => {
  if (processRef.value) new DraggableDivX(processRef.value, props.containerRef);
  videoFragmentList.value = media.trackArray;
});
</script>
<template>
  <div class="media-console">
    <div v-show="!drag" ref="processRef" class="media-console__process">
      <img :src="processHandler" alt="" />
      <div class="media-console__process-line"></div>
    </div>
    <div class="media-console__container">
      <div class="media-console__container-move-area"></div>
      <div class="media-console__container-model-track">
        <div class="media-console__container-model-track-item"></div>
      </div>
      <div ref="mainTrackRef" class="media-console__container-main-track">
        <VueDraggableNext
          v-model="videoFragmentList"
          class="list-group"
          tag="ul"
          :handle="drag ? '.media-console__container-main-track-item' : null"
          filter=".media-console__container-main-track-item-drag"
          item-key="id"
          forceFallback
          disabled
          dragClass="draggable-drag"
          chosenClass="draggable-chosen"
          fallbackClass
          :touchStartThreshold="10"
          animation="100"
          scroll
          :scrollSensitivity="30"
          @start="handleVueDraggable($event, 'start')"
          @unchoose="handleVueDraggable($event, 'unchoose')"
          @choose="handleVueDraggable($event, 'choose')"
          @end="handleVueDraggable($event, 'end')"
        >
          <transition-group type="transition" :name="!drag ? 'flip-list' : undefined">
            <li v-for="i in videoFragmentList" :key="i.sort" @mousedown="handleTrackItem($event, i.sort)">
              <div v-if="!drag" :class="['media-console__container-main-track-item', { active: activeFragmentSort === i.sort }]">
                <div class="media-console__container-main-track-item-container">
                  <img v-for="cover in i.track.cover" :src="cover" alt="" />
                </div>
                <div class="media-console__container-main-track-item-drag left" @click.stop="() => {}">
                  <img src="https://i.328888.xyz/2023/02/28/zfKKd.jpeg" />
                </div>
                <div class="media-console__container-main-track-item-drag right" @click.stop="() => {}">
                  <img src="https://i.328888.xyz/2023/02/28/zfKKd.jpeg" />
                </div>
              </div>
              <div
                v-else
                :class="[
                  'media-console__container-main-track-item',
                  { active: activeFragmentSort === i.sort && !drag, 'drag-active': activeFragmentSort === i.sort && drag },
                ]"
              >
                <div v-if="!(activeFragmentSort === i.sort)" class="media-console__container-main-track-item-container">
                  <img :src="i.track.cover[0]" alt="" />
                </div>
                <div v-else class="media-console__container-main-track-item-handler" />
              </div>
            </li>
          </transition-group>
        </VueDraggableNext>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.media-console {
  position: relative;
  display: inline-block;
  margin: 0 5px;
  .draggable-drag {
    .media-console__container-main-track-item {
      width: 80px !important;
      &-container {
        & > img {
          margin-right: 5px;
        }
      }
    }
  }

  &__process {
    position: absolute;
    width: 0;
    height: 100%;
    z-index: 20;
    & > img {
      position: absolute;
      top: -3px;
      left: 50%;
      width: 11px;
      height: 16px;
      transform: translateX(-50%);
      -webkit-user-drag: none;
      &:hover {
        cursor: ew-resize;
      }
    }
    &-line {
      position: absolute;
      top: 0;
      width: 2px;
      height: 100%;
      transform: translateX(-50%);
      pointer-events: none;
      background-color: #000;
    }
  }
  &__container {
    &-move-area {
      height: 16px;
    }
    &-model-track {
      &-item {
        width: 99px;
        height: 40px;
        background-color: aqua;
      }
    }
    &-main-track {
      display: flex;
      margin-top: 10px;
      & > ul {
        display: flex;
        padding-inline-start: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        & > li {
          list-style-type: none;
        }
      }
      &:hover {
        cursor: pointer;
      }
      &-item {
        position: relative;
        display: flex;
        align-items: center;
        padding: 4px;
        background-color: #22252c;
        border-radius: 4px;
        border: 2px solid transparent;
        overflow: hidden;
        &.active {
          border-color: #ff7714;
        }
        &.drag-active {
          border: 1px dashed #ff7714;
          background: rgba(255, 119, 20, 0.1);
        }
        &-handler {
          width: 80px;
          height: 60px;
        }
        &-container {
          display: flex;
          & > img {
            width: 80px;
            height: 60px;
            border-radius: 2px;
            -webkit-user-drag: none;
            margin-right: 2px;
            &:last-child {
              margin-right: 0;
            }
          }
        }

        &-drag {
          position: absolute;
          width: 15px;
          background-color: #000;
          height: 100%;
          opacity: 0;
          transition: opacity 0.3s;
          -webkit-user-drag: none;
          display: flex;
          align-items: center;
          justify-content: center;
          & > img {
            width: 70%;
            -webkit-user-drag: none;
          }
          &:hover {
            cursor: ew-resize;
            opacity: 1;
          }
          &.left {
            left: 0;
          }
          &.right {
            right: 0;
          }
        }
      }
    }
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
}
</style>
