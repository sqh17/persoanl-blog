<template>
  <div class="comment-wrapper box">
    <a-textarea
      v-model:value="commentIpt"
      :bordered="false"
      placeholder="说点什么..."
      style="resize: none; height: 140px"
    />
    <div class="btns">
      <a-button class="btn" @click="comment">评论</a-button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
let commentIpt = ref('')
const emit = defineEmits(['comment'])
const comment = () => {
  emit('comment', commentIpt.value)
  commentIpt.value = ''
}
</script>

<style lang="scss" scoped>
.comment-wrapper {
  flex-direction: column;
  .btns {
    display: flex;
    justify-content: flex-end;
    .btn {
      padding: 5px 20px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      &:hover {
        background-color: #1890ff;
        color: #fff;
      }
    }
  }
}
</style>
