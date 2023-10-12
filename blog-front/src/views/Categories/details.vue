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
      <div class="list-wrapper">
        <h2>分类（100）</h2>
        <a-list item-layout="horizontal" :data-source="data">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta>
                <template #title>
                  <div class="title">
                    <span>{{ item.title }}</span>
                    <span>2023-12-12</span>
                  </div>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>

        <a-pagination
          class="pagination"
          v-model:current="currentPage"
          @change="pageChange"
          :total="150"
          show-less-items
        />
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
import { useRouter } from 'vue-router'
const _router = useRouter()
const bgImg = ref(img)
console.log('_router', _router)
interface DataItem {
  title: string
  desc: string
}
const data: DataItem[] = [
  {
    title: 'Ant Design Title 1',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 2',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 3',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 4',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 1',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 2',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 3',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 4',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 1',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  },
  {
    title: 'Ant Design Title 2',
    desc: 'Ant Design, a design language for background applications, is refined by Ant UED Team'
  }
]
let currentPage = ref(1)
const pageChange = (page: number, pageSize: number) => {
  currentPage.value = page
  console.log(page, pageSize)
}
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
}

.wap-content {
  position: absolute;
  top: 56px;
  bottom: 0;
  overflow: auto;
  width: 100%;
  padding-top: 20px;
}

.list-wrapper {
  min-width: 640px;
  background: #fff;
  border-radius: 4px;
  padding: 10px 12px;
  ::v-deep .ant-list {
    .ant-list-item {
      padding: 4px 10px;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        span {
          color: #000;
        }
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
