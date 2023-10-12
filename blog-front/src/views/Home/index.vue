<template>
  <div class="common">
    <Header></Header>
    <index-animation></index-animation>
    <Footer :fixed="true"></Footer>
    <div class="home">
      <p>{{ info.introduction }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IndexAnimation from '@/components/IndexAnimation/index.vue'
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
const info = ref({
  introduction: '',
  introductionTarget: 'There is a kind of call to eat together.'
})
let i = 0
let timer: any = null

const typing = () => {
  if (i <= info.value.introductionTarget.length) {
    info.value.introduction = info.value.introductionTarget.slice(0, i++) + '_'
    timer = setTimeout(typing, 100)
  } else {
    info.value.introduction = info.value.introductionTarget //结束打字,移除 _ 光标
    clearTimeout(timer)
  }
}
onMounted(() => {
  typing()
})
</script>

<style lang="scss" scoped>
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
.right-box {
  position: fixed;
  top: 80px;
  left: 70px;
  z-index: 3;
}
</style>
