// import build from '@hono/vite-build/cloudflare-workers'
import cloudflare from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import honox from "honox/vite"

export default defineConfig({
  css:{
    transformer:"lightningcss"
  },
  resolve:{
    alias:{
      "@":new URL("app", import.meta.url).pathname
    }
  },
  plugins: [
    honox({devServer:{adapter:cloudflare()}}),
  ]
})
