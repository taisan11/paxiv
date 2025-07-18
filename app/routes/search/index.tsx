import {createRoute} from "honox/factory"
import type {Sarch} from "@/types/search"
import {fetch,withAuth} from "@/fetch"
import { url2imageURL } from "@/util"
import { SearchOptions } from "@/components/SearchOptions"
import {getCookie} from "hono/cookie"

//pでページを設定
export default createRoute(async(c)=>{
    const q = c.req.query("q")
    if (!q) return c.render(<>
        <h1>検索</h1>
        <SearchOptions formAction="/search" showOptions={false} />
    </>)
    const cookie = getCookie(c, "PHPSESSID")
    const csrfToken = getCookie(c, "X-Csrf-Token")
    const userId = getCookie(c, "userId")
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/tag_portal?word=${encodeURIComponent(q)}`,withAuth(cookie!,csrfToken!,userId!))).json() as Sarch
    sarch.body.illusts = sarch.body.illusts.filter((v) => v.url)
    return c.render(<>
        <h1>{sarch.body.tag}の検索結果</h1>
        <SearchOptions formAction="/search" currentQuery={q} />
        <nav className="search-tab-bar">
            <a href={`/search?q=${q}`}>トップ</a>
            <a href={`/search/i?q=${q}`}>イラスト</a>
            <a href={`/search/m?q=${q}`}>マンガ</a>
            <a href={`/search/n?q=${q}`}>ノベル</a>
        </nav>
        <div class="search-grid">
            {sarch.body.illusts.map((v) => (
            <div key={v.id} class="search-item">
                <img loading="lazy" src={url2imageURL(v.url)} alt={v.title} class="search-img"/>
                <a href={`/artworks/${v.id}`}>{v.title}を見る</a>
            </div>
            ))}
        </div>
    </>)
})