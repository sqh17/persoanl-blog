<template>
  <div class="not-found content">
    <h1>页面丢失....</h1>
    <a-button class="btn" @click="_router.push('/')">返回首页</a-button>
    <a-button class="btn" @click="_router.push('/articles')">返回文章列表</a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const _router = useRouter()
</script>

<style lang="scss" scoped>
.not-found {
  background: url('../../assets/images/ChMlWl7WGpqIF24GAAL-El4rwiEAAPsKwIJSQ4AAv4q942.jpeg')
    no-repeat center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    color: #fff;
  }
  .btn {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
}
</style>
