import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log(env)
  return {
    // base: './', // 设置打包路径
    base: process.env.VITE_BASE_PATH,
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [
          ElementPlusResolver(),
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      // 配置vite在运行的时候自动检测eslint规范
      eslintPlugin({
        include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.vue', 'src/*.ts', 'src/*.js', 'src/*.vue']
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
      }
    }
  }
})
