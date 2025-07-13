import { jsxRenderer } from 'hono/jsx-renderer'
import {Link,Script} from "honox/server"

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang='ja'>
      <head>
        <meta charset='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <Link href='/app/style.css' rel='stylesheet' />
        <Script src='app/dark.ts'></Script>
        <Script src='app/history.ts'></Script>
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