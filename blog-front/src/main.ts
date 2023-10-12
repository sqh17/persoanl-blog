import './assets/main.css'
import './assets/markdown.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'lib-flexible/flexible.js'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(mavonEditor)
app.use(createPinia())
app.use(router)

app.mount('#app')
