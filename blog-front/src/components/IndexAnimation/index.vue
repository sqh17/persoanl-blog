<template>
  <canvas class="index-canvas" ref="canvasDom">Canvas not supported.</canvas>
</template>
<script setup lang="ts">
import { index_fullScreenAnimation } from '@/utils/animate.js'
import { onMounted, ref } from 'vue'
const canvasDom = ref(null)
onMounted(() => {
  index_fullScreenAnimation(canvasDom.value)
})
</script>
<style lang="scss" scoped>
.index-canvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}
</style>
