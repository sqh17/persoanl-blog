<template>
  <div
    class="common"
    :style="{
      background: `url(${bgImg}) 0px center no-repeat`,
      backgroundSize: 'cover'
    }"
  >
    <Header></Header>
    <Footer v-if="isPC" fixed></Footer>

    <div :class="isPC ? 'content' : 'wap-content'">
      <div class="about-wrapper">
        <img class="img" :src="bgImg" alt="" />
        <div class="desc">
          {{ desc }}
        </div>
        <a-tag v-for="(item, index) in tags" :key="index" :color="item.color">{{
          item.name
        }}</a-tag>
      </div>
      <Footer v-if="!isPC"></Footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import img from '@/assets/images/ChMlWl7WGpaIYfP2AATsrNFrYpMAAPsKwFJH0sABOzE303.jpeg'
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import { isPC } from '@/utils/common.ts'
const bgImg = ref(img)
const desc = ref(
  '有4年前端开发经验，熟悉Vue、React、Angular前端框架。熟悉小程序开发（Taro、Remax、MpVue、Wepy、 云开发）。熟悉NodeJs、Koa，Egg等后端知识。具有良好的沟通能力、工作协调能力、不断学习新技术、熟练前端技术、热衷于前端开发。'
)

const randomColor = () => {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')
  )
}
const tags = ref([
  {
    name: 'Vue',
    color: randomColor()
  },
  {
    name: 'React',
    color: randomColor()
  },
  {
    name: 'Node.js',
    color: randomColor()
  }
])
</script>

<style lang="scss" scoped>
.content {
  padding-top: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 640px;
  margin: auto;
}

.wap-content {
  position: absolute;
  top: 56px;
  bottom: 0;
  overflow: auto;
  width: 100%;
  padding-top: 20px;
}

.about-wrapper {
  // min-width: 640px;
  background: #fff;
  border-radius: 4px;
  padding: 10px 12px;
  position: relative;
  .img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
  }
  .desc {
    color: #999;
    margin-bottom: 12px;
    margin-top: 30px;
  }
}
</style>
