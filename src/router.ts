import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/vuedraggable',
    name: 'vuedraggable',
    component: () => import('@/pages/vuedraggable/index.vue'),
  },
  {
    path: '/slider-block',
    name: 'slider-block',
    component: () => import('@/pages/slider-block/index.vue'),
  },
];

const routeInstance = createRouter({ history: createWebHashHistory(), routes });

export default routeInstance;
