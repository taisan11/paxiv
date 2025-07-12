import build from '@hono/vite-build/cloudflare-pages'
import cloudflare from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import honox from "honox/vite"
import Macros from 'unplugin-macros/vite'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'; // 開発環境なら true, ビルドなら false

  return {
    css: {
      transformer: "lightningcss" as const
    },
    resolve: {
      alias: {
        "@": "/app",
      }
    },
    build: {
      // watch: {
      //   exclude: ["C:/DumpStack.log.tmp", "./__uno.css"]
      // },
      cssMinify:"lightningcss"
    },
    plugins: [
      // Macros(),
      honox({ devServer: { adapter: isDev ? cloudflare() : undefined },client:{input:["/app/style.css","/app/setting.ts","/app/dark.ts"]} }),
      build({})
    ]
  };
});