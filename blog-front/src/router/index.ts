import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    // component: () => import('@/views/Articles/index.vue')
    children: [
      {
        path: '',
        component: () => import('@/views/Articles/index.vue')
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/Articles/articleDetail.vue')
      }
    ]
  },
  {
    path: '/archives',
    name: 'archives',
    component: () => import('@/views/Archives/index.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    // component: () => import('@/views/Categories/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Categories/index.vue')
      },
      {
        path: 'details/:id',
        component: () => import('@/views/Categories/details.vue')
      }
    ]
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('@/views/Tags/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/About/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/NotFound/index.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
