<template>
  <div class="right-config-wrapper">
    <div class="box">
      <img
        class="avatar"
        src="../../assets/images/ChMlWl7WGpaIYfP2AATsrNFrYpMAAPsKwFJH0sABOzE303.jpeg"
        alt=""
      />
      <div class="title">拾柒</div>
      <div class="desc">专注于WEB和移动端开发</div>
      <div class="tag">6年的前端开发经验</div>
      <div class="href">友情链接</div>
      <div class="href-box">
        <a href="javascript:;">
          <img
            src="../../assets/images/ChMlWl7WGpaIYfP2AATsrNFrYpMAAPsKwFJH0sABOzE303.jpeg"
            alt=""
          />
        </a>
        <a href="javascript:;">
          <img
            src="../../assets/images/ChMlWl7WGpaIYfP2AATsrNFrYpMAAPsKwFJH0sABOzE303.jpeg"
            alt=""
          />
        </a>
        <a href="javascript:;">
          <img
            src="../../assets/images/ChMlWl7WGpaIYfP2AATsrNFrYpMAAPsKwFJH0sABOzE303.jpeg"
            alt=""
          />
        </a>
      </div>
    </div>
    <div class="box">
      <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange">
        <template #headerRender="{ value: current, onChange }">
          <div style="padding: 10px">
            <a-row type="flex" justify="space-between">
              <a-col>
                <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  class="my-year-select"
                  :value="String(current.year())"
                  @change="
                    (newYear) => {
                      onChange(current.year(+newYear))
                    }
                  "
                >
                  <a-select-option
                    v-for="val in getYears(current)"
                    :key="String(val)"
                    class="year-item"
                  >
                    {{ val }}
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col>
                <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  :value="String(current.month())"
                >
                  <a-select-option
                    v-for="(val, index) in getMonths(current)"
                    :key="String(index)"
                    class="month-item"
                  >
                    {{ val }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </template>
      </a-calendar>
    </div>
    <div class="box categories-box">
      <div class="categories-title">随笔分类</div>
      <ul class="categories-list">
        <li v-for="(item, index) in categories" :key="index" @click="handler(item)">
          {{ item.name }}（{{ item.count }}）
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dayjs } from 'dayjs'
import { useRouter } from 'vue-router'
const router = useRouter()
const value = ref<Dayjs>()

const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode)
}

const getMonths = (value: Dayjs) => {
  const localeData = value.localeData()
  const months = []
  for (let i = 0; i < 12; i++) {
    months.push(localeData.monthsShort(value.month(i)))
  }
  return months
}

const getYears = (value: Dayjs) => {
  const year = value.year()
  const years = []
  for (let i = year - 10; i < year + 10; i += 1) {
    years.push(i)
  }
  return years
}
const categories = ref([
  {
    name: '技术',
    count: 10,
    id: 'tech'
  },
  {
    name: '生活',
    count: 0,
    id: 'life'
  },
  {
    name: '照片',
    count: 10,
    id: 'photo'
  },
  {
    name: '其他',
    count: 0,
    id: 'other'
  }
])
interface Categories {
  name: string
  count: number
  id: string
}
const handler = (item: Categories) => {
  if (item.count === 0) return
  router.push({
    path: `/categories/details/${item.id}`
  })
}
</script>

<style lang="scss" scoped>
.right-config-wrapper {
  padding: 10px 10px;
}
.box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:not(:first-child) {
    margin-top: 10px;
  }
}
.categories-box {
  align-items: baseline;
  .categories-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .categories-list {
    li {
      cursor: pointer;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &:hover {
        color: #1890ff;
      }
    }
  }
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0px auto;
  display: block;
}
.title {
  font-size: 18px;
  font-weight: 600;
  margin-top: 8px;
}
.desc {
  font-size: 14px;
  color: #000;
  margin-top: 8px;
}
.href {
  font-size: 12px;
  color: #000;
  margin-top: 8px;
  position: relative;
  &::before {
    width: 40px;
    height: 1px;
    background-color: #999;
    content: '';
    display: block;
    position: absolute;
    left: -45px;
    top: 50%;
    transform: translateY(-50%);
  }
  &::after {
    width: 40px;
    height: 1px;
    background-color: #999;
    content: '';
    display: block;
    position: absolute;
    right: -45px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.href-box {
  display: flex;
  a {
    &:not(:last-child) {
      margin-right: 10px;
    }
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
