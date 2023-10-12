<template>
  <div class="prev-next">
    <a-button type="link" v-if="prev" @click="goDetails(prev)">上一篇： {{ prev.title }}</a-button>
    <a-button type="link" v-if="next" @click="goDetails(next)">下一篇： {{ next.title }}</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const _router = useRouter()
defineProps({
  prev: {
    type: Object
  },
  next: {
    type: Object
  }
})
const goDetails = (item: any) => {
  _router.push({
    name: 'articlesDetails',
    query: { id: item._id }
  })
  location.reload()
  document.body.scrollIntoView()
}
</script>

<style lang="scss" scoped>
.prev-next {
  font-size: 0.24rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
