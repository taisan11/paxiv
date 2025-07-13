import { jsxRenderer } from 'hono/jsx-renderer'
import {Link} from "honox/server"
import {Script} from "@/components/Script"

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang='ja'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Link href='/app/style.css' rel='stylesheet' />
        <Script src='/app/dark.ts' />
        <Script src='/app/history.ts' />
        {/* <Script src='/app/client.ts' /> */}
        {title ? <title>{title} - paxiv</title> : <title>paxiv</title>}
      </head>
      <body>
        <header>
          <h1>
            <a href='/'>paxiv</a>
          </h1>
          <nav>
            <a href='/search'>検索</a>
            <a href='/history'>履歴</a>
            <a href='/setting'>設定</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
})