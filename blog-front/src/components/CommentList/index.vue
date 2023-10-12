<template>
  <div class="item" v-for="item in list" :key="item._id" :class="[classStyle]">
    <div class="who">
      <div class="title">
        <img
          class="img"
          src="../../assets/images/ChMlWl7WGp-IcPzZAALND7nizZwAAPsKwK4iF0AAs0n736.jpeg"
          alt=""
        />
        <div class="name-time">
          <div class="name">{{ item.nickName }}</div>
          <div class="time">{{ dayFormat(item.commentTime) }}</div>
        </div>
      </div>
      <div class="comment-content">
        <span v-if="prevWho" class="who">@{{ prevWho }}</span> {{ item.currentReplayContent }}
      </div>
      <a-button
        class="btn"
        @click="reply(item)"
        v-if="user && user.nickName !== item.nickName && user.email !== item.email"
        >回复</a-button
      >
    </div>
    <div v-if="item.children">
      <comment-list
        :prevWho="item.nickName"
        classStyle="sub-card"
        :articleId="articleId"
        :articleTitle="articleTitle"
        :list="item.children"
      ></comment-list>
    </div>
    <a-modal v-model:open="open" :title="modalTitle" @ok="handleOk" cancelText="取消" okText="确认">
      <a-textarea
        v-model:value="commentIpt"
        :bordered="false"
        placeholder="说点什么..."
        style="resize: none; height: 100px"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
const open = ref<boolean>(false)
const commentIpt = ref('')
const modalTitle = ref('')
const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
const dayFormat = (item: string) => {
  return dayjs(item).format('YYYY-MM-DD HH:mm:ss')
}
defineProps({
  list: {
    type: Array,
    default: () => []
  },
  articleId: {
    type: String,
    default: ''
  },
  articleTitle: {
    type: String,
    default: ''
  },
  classStyle: {
    type: String,
    default: ''
  },
  prevWho: {
    type: String,
    default: ''
  }
})
interface User {
  nickName: string
  email: string
}
const user = ref<User>({
  nickName: 'Never',
  email: '13412345678@163.com'
})
defineOptions({
  name: 'comment-list'
})
const reply = (item: any) => {
  console.log('reply', item)
  if (!user.value) {
    message.warning('登录才能回复')
    return
  }
  open.value = true
  modalTitle.value = `回复 @${item.nickName}`
}
</script>

<style lang="scss" scoped>
.comment-content {
  padding: 20px 10px;
}
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
.item {
  margin-bottom: 16px;
  .title {
    display: flex;
    align-items: center;
  }
  .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.sub-card {
  border-left: 1px dashed #00e676;
  border-bottom: 1px dashed #00e676;
  box-shadow: none;
  border-radius: 0;
  margin-left: 20px;
  margin-top: 20px;
  padding: 20px;
}
</style>
