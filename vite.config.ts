import build from '@hono/vite-build/cloudflare-workers'
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
      cssMinify: "lightningcss"
    },
    plugins: [
      // Macros(),
      honox({
        devServer: { adapter: isDev ? cloudflare() : undefined },
        client: {
          input: [
            "/app/style.css",
            "/app/script/activity.ts",
            "/app/script/dark.ts",
            "/app/script/manga-viewer.ts",
            "/app/script/novel-settings.ts",
            "/app/script/search-options.ts",
            "/app/script/setting.ts"
          ]
        }
      }),
      build({})
    ]
  };
});
