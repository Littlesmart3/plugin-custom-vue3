<script lang="ts" setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { DEMO3_IMG, DEMO3_IMG2 } from '../config';
import { gsap } from 'gsap';

const canvasRef = ref<HTMLCanvasElement>();

const init = () => {
  const c = canvasRef.value;
  if (!c) throw new Error('画布未生成');

  // 建立一个 CanvasRenderingContext2D 二维渲染上下文。
  const ctx = c.getContext('2d');
  if (!ctx) throw new Error('二维渲染未生成');
  // 画布宽度
  let cw = 0;
  // 画布高度
  let ch = 0;
  let hue = 180;
  const img = new Image();
  const img2 = new Image();
  let nCubes = 0;
  // 立方体数组
  let cubes: any[] = [];
  // 交错
  let staggerAnim: gsap.core.Timeline;

  class Cube {
    public img: any;
    public img2: any;
    public scale: any;
    public x: any;
    public y: any;
    public z: any;
    public img2_opacity: any;
    public constructor(index: any, _x: any, _y: any, _s: any) {
      this.img = img;
      this.img2 = img2;
      this.scale = _s;
      this.x = _x;
      this.y = _y;
      this.z = this.img2_opacity = 0;
      this.draw();
    }
    public draw() {
      if (!ctx) throw new Error('二维渲染未生成');
      ctx.translate(this.x, this.y + this.z);
      ctx.drawImage(this.img, (-100 / 2) * this.scale, (-200 / 2) * this.scale, 100 * this.scale, 200 * this.scale);
      ctx.globalAlpha = this.img2_opacity;
      ctx.drawImage(this.img2, (-100 / 2) * this.scale, (-200 / 2) * this.scale, 100 * this.scale, 200 * this.scale);
      ctx.globalAlpha = 1;
      ctx.translate(-this.x, -(this.y + this.z));
    }
  }

  img.src = DEMO3_IMG;
  img2.src = DEMO3_IMG2;

  const setGrid = () => {
    //console.log('set grid')

    c.width = window.innerWidth;
    c.height = window.innerHeight;
    cw = Math.ceil(c.width / 100 + 1);
    ch = Math.floor(c.height / 25 + 10);

    cubes = [];
    let _y = 0;
    let _x = 0;
    for (let i = (_y = 0); _y < ch; _y++) {
      for (_x = 0; _x < cw; _x++) {
        //console.log(_y%2==0)
        if (_y % 2 == 0) cubes.push(new Cube(i, -25 + _x * 100, -75 + _y * 25, 0.9));
        else cubes.push(new Cube(i, 25 + _x * 100, -75 + _y * 25, 0.9));
        i++;
      }
    }

    nCubes = cubes.length; //console.log(nCubes)
  };
  img.onload = window.onresize = setGrid;

  const staggerFrom = (from: any) => {
    const config1 = {
      duration: 1,
      z: 125,
      ease: 'back.in(3)',
      stagger: {
        yoyo: true,
        amount: 2.5,
        grid: [ch, cw],
        overwrite: 'auto',
        from: from,
        onComplete: function () {
          // Like reverse: 1 but make sure to reach a z of 0
          // gsap.to(targets(), {
          //   duration: 1,
          //   z: 0,
          //   ease: 'back.out(3)',
          // });
        },
      },
    };

    const config2 = {
      duration: 0.6,
      img2_opacity: 1,
      stagger: {
        yoyo: true,
        amount: 2.5,
        grid: [ch, cw],
        overwrite: 'auto',
        from: from,
        onComplete: function () {
          // gsap.to(targets(), {
          //   duration: 0.6,
          //   img2_opacity: 0,
          // });
        },
      },
    };
    return gsap.timeline().to(cubes, config1, 0).to(cubes, '', config2, 0);
  };

  function anim() {
    staggerAnim = gsap.timeline({ onComplete: anim }).add(staggerFrom(gsap.utils.random(0, nCubes, 1)));
  }

  gsap.delayedCall(0.2, anim);

  canvasRef.value?.addEventListener('click', function (e: any) {
    staggerAnim.eventCallback('onComplete', null);

    // An approximation that works okay
    var gridX = Math.floor(((e.layerX - ((e.layerX / c.width) * 2 - 1) * 20 - (e.layerX / c.width) * 75) / c.width) * cw);
    var gridY = Math.floor(((e.layerY - ((e.layerY / c.height) * 2 - 1) * 75 + 40) / c.height) * ch);
    var i = cw * gridY + gridX;

    staggerFrom(i); //console.log(gridX, gridY, i);
  });

  gsap.ticker.add(() => {
    //update on each tick

    ctx.clearRect(0, 0, c.width, c.height);

    ctx.globalCompositeOperation = 'source-over';
    console.log('cubes', cubes);

    for (var i = 0; i < nCubes; i++) cubes[i].draw();

    hue -= 0.5;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'hsl(' + hue + ', 75%, 25%)';
    ctx.fillRect(0, 0, c.width, c.height);
  });
};

onMounted(() => {
  init();
  // console.log('2.-组件挂载到页面之后执行-------onMounted')
});
</script>
<template>
  <div class="gsap-case-demo3">
    <canvas ref="canvasRef" class="gsap-case-demo3__canvas"></canvas>
  </div>
</template>

<style scoped lang="less">
.gsap-case-demo3 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
</style>
