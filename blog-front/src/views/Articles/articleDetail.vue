<template>
  <div class="article-detail-wrapper">
    <Header></Header>
    <div class="container">
      <div class="left">
        <right-config></right-config>
      </div>
      <div class="right">
        <div class="article-content box">
          <div class="article-title">文章标题</div>
          <div class="article-cover">
            <img
              style="height: 300px; width: 100%"
              src="../../assets/images/ChMlWV7WGpSIZICWAAPSyIdFiskAAPsKwEcl6YAA9Lg531.jpeg"
              alt=""
            />
          </div>
          <div class="article-info">
            <div class="btns">
              <div class="btn">
                <View style="width: 1.2em; height: 1.2em; margin-right: 8px" /> 查看（100）
              </div>
              <div class="btn">
                <ChatLineRound style="width: 1.2em; height: 1.2em; margin-right: 8px" />评论（100）
              </div>
              <div class="btn">
                <Star style="width: 1.2em; height: 1.2em; margin-right: 8px" />赞（100）
              </div>
            </div>
            <div class="time">编辑时间：2021-08-08</div>
          </div>
          <div class="article-p">
            <mavon-editor
              ref="mavon"
              v-model="content"
              :ishljs="true"
              :toolbarsFlag="false"
              :subfield="false"
              defaultOpen="preview"
              :navigation="true"
              codeStyle="tomorrow-night-eighties"
            />
          </div>
          <div class="tags-wrapper">
            <a-tag :color="randomColor()">
              <template #icon>
                <PaperClipOutlined />
              </template>
              vue
            </a-tag>
            <a-tag :color="randomColor()">
              <template #icon>
                <PaperClipOutlined />
              </template>
              md
            </a-tag>
          </div>
        </div>
        <div class="comment-wrapper">
          <el-tooltip effect="dark" content="点赞" placement="top-start">
            <div class="btn">
              <View style="width: 2em; height: 2em" />
            </div>
          </el-tooltip>
          <!-- <el-tooltip effect="dark" content="评论" placement="top-start">
            <div class="btn">
              <ChatLineRound style="width: 2em; height: 2em" />
            </div>
          </el-tooltip> -->
          <el-tooltip effect="dark" content="收藏" placement="top-start">
            <div class="btn" :class="[active ? 'active-btn' : '']">
              <Star style="width: 2em; height: 2em" />
            </div>
          </el-tooltip>
        </div>
        <Comment @comment="comment" />
        <div class="comment-list-w box comment-list">
          <div class="header-title">评论（100）</div>
          <el-divider />
          <CommentList
            v-if="commentList.length > 0"
            :articleId="info._id"
            :articleTitle="info.title"
            :list="commentList"
          ></CommentList>
        </div>
        <PrevNext :prev="prev" :next="next" />
        <div class="catalogue-wrapper box">
          <div class="catalogue-title">目录</div>
          <div class="catalogue-content" v-for="item in toc" :key="item.name">
            <a @click="scrollToPosition(item.href)" v-html="item.name"></a>
          </div>
        </div>
      </div>
    </div>
    <Footer fontColor="#999"></Footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import RightConfig from '@/components/RightConfig/index.vue'
import Comment from '@/components/Comment/index.vue'
import CommentList from '@/components/CommentList/index.vue'
import PrevNext from '@/components/PrevNext/index.vue'
import { ElMessage } from 'element-plus'
// import mavon from 'mavon-editor'
// import { markdown } from '@/utils/markdown.js'
import Clipboard from 'clipboard'
import $ from 'jquery'
import { PaperClipOutlined } from '@ant-design/icons-vue'
let content = ref(
  '在前端开发中， html 转 pdf 是最常见的需求，实现这块需求的开发[html2canvas](http://html2canvas.hertzen.com/)和 [jspdf](http://mozilla.github.io/pdf.js/getting_started/) 是最常用的两个插件，插件都是现成的。\n### 1.安装\n#### 1.1 费费费\n### 2.使用 \n ```js \n console.log(123); \n```'
)
let active = ref(true)
const randomColor = () => {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, '0')
  )
}
interface Toc {
  href: string
  name: string
}
let toc = ref<Toc[]>([])
nextTick(() => {
  const aArr = $(
    '.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content a'
  ).toArray()

  aArr.forEach((item: HTMLElement) => {
    let href = $(item).attr('id')
    let name = $(item).parent().text()
    if (href) {
      // 这里判断是因为我们只需要有id的内容，没有id的则过滤掉。
      toc.value.push({
        href: '#' + href,
        name
      })
    }
  })
  let clipboard = new Clipboard('.copy-btn')
  // 复制成功失败的提示
  clipboard.on('success', () => {
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  })
  clipboard.on('error', () => {
    ElMessage({
      message: '复制成功',
      type: 'error'
    })
  })
})
let mavon = ref(null)
onMounted(() => {
  console.log('mavon.value', mavon.value)
  // content.value = markdown(mavon.value, content.value)
})
const scrollToPosition = (id: any) => {
  var position = $(id).offset()
  position.top = position.top - 80
  $('html,body').animate({ scrollTop: position.top }, 1000)
}
const comment = (val: string) => {
  console.log('val', val)
}
const info = ref({
  _id: '601134b4c4ae0128013d322d',
  title: '使用jspdf+canvas2html将网页保存为pdf文件',
  introduction: '简介',
  cover: 'http://nevergiveupt.top/canvas/html2canvas.png'
})
let commentList = ref([
  {
    targetReplayId: '6084ce48e268db458626591a',
    targetReplayContent: 'good',
    currentReplayContent: '这篇文章写得不错',
    commentTime: 1623048202,
    auditTime: 0,
    auditStatus: '3',
    _id: '60bdc00ac4b76ef12cd151aa',
    avatar: 'http://www.nevergiveupt.top/user_avatar.png',
    email: '13412345678@163.com',
    nickName: 'Never',
    articleId: '601134b4c4ae0128013d322d',
    articleTitle: '测试评论文章'
  },
  {
    targetReplayId: '',
    targetReplayContent: '',
    currentReplayContent: 'good',
    commentTime: 1619316296,
    auditTime: 1619316309,
    auditStatus: '1',
    _id: '6084ce48e268db458626591a',
    avatar: 'http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png',
    email: '1916579055@qq.com',
    nickName: '永不放弃',
    articleId: '601134b4c4ae0128013d322d',
    articleTitle: '测试评论文章'
  },
  {
    targetReplayId: '',
    targetReplayContent: '',
    currentReplayContent: '好，不错',
    commentTime: 1611745373,
    auditTime: 1612108800,
    auditStatus: '1',
    _id: '6011485dc4ae0128013d3246',
    avatar: 'http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png',
    email: '1916579055@qq.com',
    nickName: '永不放弃',
    articleId: '601134b4c4ae0128013d322d',
    articleTitle: '测试评论文章'
  }
])
const listToTree = (list: any) => {
  let info = list.reduce(
    (map: any, node: any) => ((map[node._id] = node), (node.children = []), map),
    {}
  )
  return list.filter((node: any) => {
    info[node.targetReplayId] && info[node.targetReplayId].children.push(node)
    return !node.targetReplayId
  })
}
let prev = ref({
  categories: '技术',
  collect: 0,
  comment: 0,
  content:
    '### 1.toRefs↵把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref↵↵`应用`: ',
  cover: 'http://nevergiveupt.top/vue/vue_composition_api.jpeg',
  createTime: 1611739740,
  introduction:
    'toRefs把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。',
  isCollect: true,
  isComment: true,
  isLike: true,
  isReward: false,
  like: 0,
  publishStatus: 1,
  sort: 0,
  status: 1,
  tags: ['Vue'],
  title: 'Vue3.x-toRefs & shallowReactive & shallowRef & shallowReadonly',
  updateTime: 1611739813,
  views: 5,
  _id: '6011325cc4ae0128013d3210'
})
let next = ref({
  categories: '技术',
  collect: 0,
  comment: 0,
  content: '### 1.注册GitHub账号并创建一个OAuth Apps↵↵登录GitHub账号然后右上角找到你的头像点击',
  cover: 'http://nevergiveupt.top/egg/github_signin.png',
  createTime: 1612341189,
  introduction:
    '『登录鉴权』 是一个常见的业务场景，包括『账号密码登录方式』和『第三方统一登录』。其中，后者我们经常使用到，如 Google， GitHub，QQ 统一登录，它们都是基于 OAuth 规范。',
  isCollect: true,
  isComment: true,
  isLike: true,
  isReward: true,
  like: 1,
  publishStatus: 1,
  sort: 0,
  status: 1,
  tags: ['Node.js', 'Egg'],
  title: '使用Egg通过GitHub来实现用户登录',
  updateTime: 1612341807,
  views: 6,
  _id: '601a5fc5e268db458626523d'
})
onMounted(() => {
  setTimeout(() => {
    commentList.value = listToTree(commentList.value)
  }, 1000)
})
</script>

<style lang="scss" scoped>
.article-detail-wrapper {
  padding-top: 45px;
  min-height: 100vh;
  background-color: #eee;

  .container {
    display: flex;
  }
  .right {
    flex: 1;
  }
  .left {
    width: 300px;
    flex: none;
    height: calc(100vh - 128px);
  }
  .catalogue-wrapper {
    position: fixed;
    width: 20%;
    right: 20px;
    top: 80px;
    .catalogue-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .catalogue-content {
      margin-left: 10px;
      a {
        display: block;
        margin-bottom: 10px;
        color: #000;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
  .article-content {
    width: calc(80% - 60px);
    margin-top: 10px;
    padding: 20px 20px;
    .article-info {
      display: flex;
      justify-content: space-between;
    }
    .article-title {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .btns {
      display: flex;
      .btn {
        display: flex;
        align-items: center;
      }
    }
  }
  .comment-wrapper {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    width: calc(80% - 60px);
    .btn {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      cursor: pointer;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      &:hover {
        color: #1890ff;
      }
    }
    .active-btn {
      color: #1890ff;
    }
  }
  .article-p {
    padding-top: 10px;
  }
  ::v-deep .v-note-wrapper .v-note-panel .v-note-navigation-wrapper.transition {
    display: none;
  }
  .tags-wrapper {
    margin-top: 10px;
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
}
.comment-list {
  width: calc(80% - 60px);
  margin-top: 20px;
  .header-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
