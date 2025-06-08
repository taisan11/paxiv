import build from '@hono/vite-build/cloudflare-pages'
import cloudflare from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import honox from "honox/vite"
import Macros from 'unplugin-macros/vite'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'; // 開発環境なら true, ビルドなら false

  return {
    css: {
      transformer: "lightningcss"
    },
    resolve: {
      alias: {
        "@": new URL("app", import.meta.url).pathname
      }
    },
    build: {
      watch: {
        exclude: ["C:/DumpStack.log.tmp", "./__uno.css"]
      },
    },
    plugins: [
      Macros(),
      honox({ devServer: { adapter: isDev ? cloudflare() : undefined } }),
      build({})
    ]
  };
});