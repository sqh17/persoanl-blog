<template>
  <div class="articles-wrapper">
    <Header></Header>
    <div class="container">
      <div class="left">
        <right-config></right-config>
      </div>
      <div class="right">
        <ul>
          <li class="item" v-for="(item, index) in list" :key="index">
            <img
              class="img"
              src="../../assets/images/ChMlWl7WGp-IcPzZAALND7nizZwAAPsKwK4iF0AAs0n736.jpeg"
              alt=""
            />
            <div class="articles-item">
              <div class="title" @click="itemHandler(item)">{{ item.title }}</div>
              <div class="description">{{ item.introduction }}</div>
              <div class="comment-time">
                <div class="btns">
                  <div class="btn">
                    <View style="width: 1.2em; height: 1.2em; margin-right: 8px" /> 查看（{{
                      item.views
                    }}）
                  </div>
                  <div class="btn">
                    <ChatLineRound style="width: 1.2em; height: 1.2em; margin-right: 8px" />评论（{{
                      item.comment
                    }}）
                  </div>
                  <div class="btn">
                    <Star style="width: 1.2em; height: 1.2em; margin-right: 8px" />赞（{{
                      item.collect
                    }}）
                  </div>
                </div>
                <div class="time">{{ dayFormat(item.createTime) }}</div>
              </div>
            </div>
          </li>
        </ul>
        <a-pagination
          class="pagination"
          v-model:current="currentPage"
          @change="pageChange"
          :total="150"
          show-less-items
        />
      </div>
    </div>
    <Footer fontColor="#999"></Footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import RightConfig from '@/components/RightConfig/index.vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
let currentPage = ref(1)
const pageChange = (page: number, pageSize: number) => {
  currentPage.value = page
  console.log(page, pageSize)
}
const dayFormat = (item: string) => {
  return dayjs(item).format('YYYY-MM-DD HH:mm:ss')
}
const _router = useRouter()
const itemHandler = (item: any) => {
  _router.push({
    path: `/articles/detail/${item._id}`
  })
}
const list = ref([
  {
    categories: '技术',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  },
  {
    categories: '生活',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  },
  {
    categories: '技术',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  },
  {
    categories: '生活',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  },
  {
    categories: '技术',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  },
  {
    categories: '生活',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  },
  {
    categories: '技术',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  },
  {
    categories: '生活',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  },
  {
    categories: '技术',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  },
  {
    categories: '生活',
    collect: 0,
    comment: 0,
    content: '123',
    cover: 'http://nevergiveupt.top/canvas/html2canvas.png',
    createTime: 1612403820,
    introduction:
      '有时候我们需要打印当前网页，那么方式有很多，可以window.print()唤起浏览器打印。但我们大部分处理方式是将其保存为pdf文件。',
    isCollect: true,
    isComment: true,
    isLike: true,
    isReward: false,
    like: 0,
    publishStatus: 1,
    sort: 0,
    status: 1,
    tags: ['Canvas', 'Pdf.js'],
    title: '使用jspdf+canvas2html将网页保存为pdf文件',
    updateTime: 1612416421,
    views: 9,
    _id: '601b546ce268db458626529c'
  }
])
</script>

<style lang="scss" scoped>
.articles-wrapper {
  padding-top: 45px;
  min-height: 100vh;
  background-color: #eee;

  .container {
    display: flex;
  }

  .left {
    width: 300px;
    flex: none;
    height: calc(100vh - 128px);
  }

  .right {
    flex: 1;
    padding: 10px 12px 0 12px;

    .item {
      display: flex;
      align-items: center;
      border: 1px solid #ebebeb;
      padding: 12px;
      background: #fff;
      margin-bottom: 12px;
    }

    .img {
      height: 100px;
      width: 100px;
      margin-right: 12px;
      border-radius: 4px;
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 8px;
      cursor: pointer;
    }

    .description {
      font-size: 14px;
      color: #999;
      margin-bottom: 8px;
      min-height: 42px;
      line-height: 1;
      // 三行省略号
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; // 限制的行数
      -webkit-box-orient: vertical;
    }

    .btns {
      display: flex;

      .btn {
        margin-right: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
          color: #1890ff;
        }
      }
    }

    .comment-time {
      display: flex;
      justify-content: space-between;
    }

    .pagination {
      margin-top: 12px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
