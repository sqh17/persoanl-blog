<template>
  <div>
    <index-animation></index-animation>
    <div class="common">
      <div class="home">
        <p>{{ info.introduction }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from 'vue'
import IndexAnimation from '@/components/IndexAnimation/index.vue'

const info = ref({
  introduction: "",
  introductionTarget: "There is a kind of call to eat together."
})
let i = 0;
let timer: any = null;

const typing = () => {
  if (i <= info.value.introductionTarget.length) {
    info.value.introduction =
      info.value.introductionTarget.slice(0, i++) + "_";
    timer = setTimeout(typing, 100);
  } else {
    info.value.introduction = info.value.introductionTarget; //结束打字,移除 _ 光标
    clearTimeout(timer);
  }
}
onMounted(()=>{
  typing()
})
</script>

<style lang='scss' scoped>
.home {
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  transform: translateY(-50%);
  font-size: 0.48rem;
  color: #fff;
  font-weight: 500;
}
.common {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .right-box {
    position: fixed;
    top: 80px;
    left: 70px;
    z-index: 3;
  }
}
</style>