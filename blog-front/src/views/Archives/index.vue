<template>
  <div
    class="archives-wrapper common"
    :style="{ background: `url(${bgImg}) 0px center no-repeat`, backgroundSize: 'cover' }"
  >
    <Header></Header>

    <a-timeline mode="alternate" class="timeline-wrapper">
      <a-timeline-item v-for="item in timelineList" :key="item.id">
        <!-- <template #dot
          ><ClockCircleOutlined style="font-size: 16px; background;: aliceblue"
        /></template> -->
        {{ item.title }}</a-timeline-item
      >
    </a-timeline>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import img from '@/assets/images/ChMlWl7WGp-IcPzZAALND7nizZwAAPsKwK4iF0AAs0n736.jpeg'
const bgImg = ref(img)
let timelineList = ref([
  {
    id: 1,
    title: 'Create a services site 2015-09-01',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 2,
    title: 'Solve initial network problems 1',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 3,
    title: 'Technical testing 1',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 4,
    title: 'Network problems being solved 1',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 5,
    title: 'Create a services site 2',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 6,
    title: 'Solve initial network problems 2',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 8,
    title: 'Technical testing 2',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 9,
    title: 'Network problems being solved 2',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 10,
    title: 'Create a services site 3',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 11,
    title: 'Solve initial network problems 3',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 12,
    title: 'Technical testing 3',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    id: 13,
    title: 'Network problems being solved 3',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },

  {
    id: 14,
    title: 'Create a services site 4',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
  },
  {
    id: 15,
    title: 'Solve initial network problems 4',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
  },
  {
    id: 16,
    title: 'Technical testing 4',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
  },
  {
    id: 17,
    title: 'Network problems being solved 4',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
  }
])
</script>

<style lang="scss" scoped>
.archives-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 45px;
  flex-direction: column;
}
::v-deep .timeline-wrapper {
  width: 100%;
  padding: 10px 0;
  .ant-timeline-item-content {
    color: #fff;
  }
  .ant-timeline-item-tail {
    background-color: #fff;
  }
}
</style>
