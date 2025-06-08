import { jsxRenderer } from 'hono/jsx-renderer'
import {Link} from "honox/server"

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang='ja'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Link href='/app/style.css' rel='stylesheet' />
        {title ? <title>{title} - paxiv</title> : <title>paxiv</title>}
      </head>
      <body>{children}</body>
    </html>
  )
})