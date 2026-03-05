import {createRoute} from "honox/factory"
import type {SearchAll} from "@/types/search"
import {fetch,withAuth} from "@/fetch"
import { url2imageURL } from "@/util"
import { SearchOptions } from "@/components/SearchOptions"
import { SearchTabBar } from "@/components/SearchTabBar"
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
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/tag_portal?word=${encodeURIComponent(q)}`,withAuth(cookie!,csrfToken!,userId!))).json() as SearchAll
    sarch.body.illusts = sarch.body.illusts.filter((v) => v.url)
    return c.render(<>
        <h1>{sarch.body.tag}の検索結果</h1>
        <SearchOptions formAction="/search" currentQuery={q} />
        <SearchTabBar q={q} />
        <div class="list-base-grid">
            {sarch.body.illusts.map((v) => (
            <a href={`/artworks/${v.id}`} key={v.id} class="list-base-item">
                <img loading="lazy" src={url2imageURL(v.url)} alt={v.title} class="list-base-img"/>
            </a>
            ))}
        </div>
    </>)
})