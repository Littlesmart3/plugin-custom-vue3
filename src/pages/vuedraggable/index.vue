<template>
  <div class="row">
    <div class="col-2">
      <button class="btn btn-secondary button" @click="sort">To original order</button>
    </div>

    <div class="col-6">
      <h3>Transition</h3>
      <VueDraggableNext class="list-group" tag="ul" v-model="list" v-bind="dragOptions" @start="drag = true" @end="drag = false">
        <transition-group type="transition" :name="!drag ? 'flip-list' : undefined">
          <li class="list-group-item" v-for="element in list" :key="element.order">
            <i :class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click="element.fixed = !element.fixed" aria-hidden="true"></i>
            {{ element.name }}
          </li>
        </transition-group>
      </VueDraggableNext>
    </div>

    <rawDisplayer class="col-3" :value="list" title="List" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

const message = ['vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based', 'on', 'Sortablejs'];

const list = ref(message.map((name, index) => ({ name, order: index + 1, fixed: false })));
const drag = ref(false);

const dragOptions = computed(() => ({ animation: 200, group: 'description', disabled: false, ghostClass: 'ghost' }));

function sort() {
  list.value = list.value.sort((a, b) => a.order - b.order);
}
</script>

<style>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
