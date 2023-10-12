<template>
  <div class="footer" :class="{ 'fixed-footer': fixed }" :style="{ color: fontColor }">
    <div class="copyright">
      <a target="_blank" href="javascript:;">Copyright © 2023 十七啦啦啦啦啦啦</a>
    </div>
    <div>本系统由Vue3+antd+ts提供技术支持</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  fixed: {
    type: Boolean,
    default: false
  },
  fontColor: {
    type: String,
    default: '#fff'
  }
})
</script>

<style lang="scss" scoped>
.fixed-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
.footer {
  text-align: center;
  font-size: 0.26667rem;
  color: #fff;
  padding: 18px 0;
  .copyright {
    a {
      color: inherit;
    }
  }
}
</style>
