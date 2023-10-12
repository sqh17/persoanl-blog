<template>
  <div class="header">
    <a-page-header
      title="拾柒的博客"
      :avatar="{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }"
    >
      <template #tags>
        <a-tag color="blue">Coding</a-tag>
      </template>
      <template #extra>
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="itemHandler"
        />
        <a-dropdown>
          <div class="personal-drop" @click.prevent>
            <span class="name">十七十七十七十七十七十七十七十七十七十七</span>
            <DownOutlined />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-item>
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-page-header>
    <div class="tool-wrapper" v-if="isShowAction">
      <div class="tool-item" v-if="!info.login && !user" @click="open('login')">登录</div>
      <div class="tool-item" v-if="!info.register && !user" @click="open('register')">注册</div>
      <div class="tool-item" @click="open('search')">搜索</div>
    </div>
    <div class="back-top" v-show="showBackTop" @click="scrollTop">
      <a-tooltip>
        <template #title>返回顶部</template>
        <ArrowUpOutlined />
      </a-tooltip>
    </div>
    <LogoinForm :openLogin="openLogin" @openLoginFn="openLoginFn"></LogoinForm>
    <RegisterForm :openRegister="openRegister" @openRegisterFn="openRegisterFn"></RegisterForm>
    <search-form :openSearch="openSearch" @openSearchFn="openSearchFn"></search-form>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted, computed } from 'vue'
import { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import LogoinForm from '@/components/LoginForm/index.vue'
import RegisterForm from '@/components/RegisterForm/index.vue'
import SearchForm from '@/components/SearchForm/index.vue'
import {
  HomeOutlined,
  DatabaseOutlined,
  ReadOutlined,
  UserOutlined,
  AppstoreOutlined,
  EnvironmentOutlined,
  DownOutlined,
  ArrowUpOutlined
} from '@ant-design/icons-vue'
const current = ref<string[]>(['index'])
const items = ref<MenuProps['items']>([
  {
    key: 'index',
    icon: () => h(HomeOutlined),
    title: 'index',
    label: '首页'
  },
  {
    key: 'articles',
    icon: () => h(ReadOutlined),
    title: 'articles',
    label: '文章'
  },
  {
    key: 'archives',
    icon: () => h(DatabaseOutlined),
    title: 'archives',
    label: '归档'
  },
  {
    key: 'categories',
    icon: () => h(AppstoreOutlined),
    title: 'categories',
    label: '分类'
  },
  {
    key: 'tags',
    icon: () => h(EnvironmentOutlined),
    title: 'tags',
    label: '标签'
  },
  {
    key: 'about',
    icon: () => h(UserOutlined),
    title: 'about',
    label: '关于'
  }
])
const _router = useRouter()
const itemHandler = ({ key }: { key: string }) => {
  if (key === current.value[0]) return
  current.value = [key]
  _router.push(`/${key}`)
}
const showBackTop = ref(false)
const scrollTop = () => {
  document.body.scrollIntoView({ block: 'start', behavior: 'smooth' })
}
onMounted(() => {
  const { path } = _router.currentRoute.value
  console.log(_router.currentRoute.value)
  current.value = [path.slice(1)]
  window.onscroll = () => {
    if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
      showBackTop.value = true
    } else {
      showBackTop.value = false
    }
  }
})
let openLogin = ref(false)
let openRegister = ref(false)
let openSearch = ref(false)
let info = ref({
  login: false, // 是否开启登录
  openSearch: true, // 是否开启搜索
  register: false // 是否开启注册
})
interface User {
  nickName: string
  email: string
}
// const user = ref<User>({
//   nickName: 'Never',
//   email: '13412345678@163.com'
// })
const user = ref(null)
let isShowAction = computed(() => {
  return info.value.login || info.value.openSearch || info.value.register
})
const open = (item: string) => {
  if (item === 'login') {
    openLogin.value = true
  } else if (item === 'register') {
    openRegister.value = true
  } else if (item === 'search') {
    openSearch.value = true
  }
}
const openLoginFn = (item: boolean) => {
  console.log(item)
  openLogin.value = item
}
const openRegisterFn = (item: boolean) => {
  console.log(item)
  openRegister.value = item
}
const openSearchFn = (item: boolean) => {
  console.log(item)
  openSearch.value = item
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 1501;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px 4px 12px 0px rgba(0, 27, 110, 0.08);
  ::v-deep .ant-page-header {
    background-color: transparent;
    padding: 0px 24px;
    .ant-page-header-heading-extra {
      margin: 0;
    }
    .ant-page-header-heading-title {
      color: #000;
    }
    .ant-menu {
      border-bottom: none;
      display: flex;
      align-items: center;
    }
    .personal-drop {
      cursor: pointer;
      display: flex;
      align-items: center;
      > .name {
        margin: 0 2px;
        display: block;
        width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: right;
      }
    }
  }
}
.tool-wrapper {
  position: fixed;
  z-index: 1500;
  left: 20px;
  bottom: 100px;
  .tool-item {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 4px 12px 0px rgba(0, 27, 110, 0.08);
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
}
.back-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6e6e6;
  &:hover {
    background-color: #eee;
  }
}
</style>
