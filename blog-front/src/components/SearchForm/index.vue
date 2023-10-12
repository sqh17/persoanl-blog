<template>
  <a-modal
    :open="openSearch"
    :closable="false"
    width="80%"
    :centered="true"
    :footer="null"
    :keyboard="true"
    :maskClosable="true"
    @cancel="handleCancel"
  >
    <div class="autocomplete-wrapper">
      <a-auto-complete
        v-model:value="value"
        :options="options"
        style="width: 100%"
        placeholder="文章搜索"
        :bordered="false"
        @select="onSelect"
        @search="onSearch"
      >
        <template #option="item">
          <div style="display: flex; justify-content: space-between">
            <span>
              Found {{ item.query }} on
              <a
                :href="`https://s.taobao.com/search?q=${item.query}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.category }}
              </a>
            </span>
            <span>{{ item.count }} results</span>
          </div>
        </template>
      </a-auto-complete>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  openSearch: {
    type: Boolean,
    default: false
  }
})
interface MockVal {
  value: string
}

const mockVal = (str: string, repeat = 1): MockVal => {
  return {
    value: str.repeat(repeat)
  }
}
const value = ref('')
const options = ref<MockVal[]>([])
const onSearch = (searchText: string) => {
  console.log('searchText')
  options.value = !searchText
    ? []
    : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
const onSelect = (value: string) => {
  console.log('onSelect', value)
}
const emit = defineEmits(['openSearchFn'])
const handleCancel = () => {
  value.value = ''
  emit('openSearchFn', false)
}
</script>

<style lang="scss" scoped>
.autocomplete-wrapper {
  ::v-deep .el-autocomplete {
    width: 100%;
    .el-input__inner {
      border: none;
      box-shadow: none;
    }
    .el-input-group__append {
      border-left: none;
    }
  }
}
</style>
