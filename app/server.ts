import { createApp } from 'honox/server'
import { showRoutes } from 'hono/dev'
import {bodyLimit} from "hono/body-limit"
import {secureHeaders} from "hono/secure-headers"
import {timeout} from "hono/timeout"
import {etag} from "hono/etag"
import {cors} from "hono/cors"

const app = createApp()

app.use(bodyLimit({maxSize: 50 * 1024}))
app.use(secureHeaders())
app.use(cors({
  origin:"*",
  allowMethods:["GET"],
  maxAge:600
}))
app.use(etag())

if (import.meta.env.DEV) {
  showRoutes(app, { verbose: true })
}

export default app