import {createRoute} from "honox/factory"
import type {searchnovel} from "@/types/search"
import {fetch} from "@/fetch"
import { host,url2imageURL } from "@/util"

//pでページを設定
export default createRoute(async(c)=>{
    const q = c.req.query("q")
    const p = parseInt(c.req.query("p") || "1")
    if (!q) return c.render(<>
        <h1>検索</h1>
        <form action="/search" method="get">
            <input type="text" name="q" id="q" placeholder="キーワード" />
            <button type="submit">検索</button>
        </form>
    </>)
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/tag_portal?include_meta=1&csw=0&p=${p}&word=${encodeURIComponent(q)}&type=manga`)).json() as searchnovel
    sarch.body.novels.filter((v) => v.id)
    return c.render(<>
        <h1>{q}の検索結果</h1>
        <nav className="search-tab-bar">
            <a href={`/search?q=${q}`}>トップ</a>
            <a href={`/search/i?q=${q}`}>イラスト</a>
            <a href={`/search/m?q=${q}`}>マンガ</a>
            <a href={`/search/n?q=${q}`}>ノベル</a>
        </nav>
        <div class="search-grid">
            {sarch.body.novels.map((novel) => (
                <div class="search-item" key={novel.id}>
                    <img loading="lazy" src={url2imageURL(novel.url, host(c))} alt={novel.title} />
                    <a href={`/novel/${novel.id}`} target="_blank">{novel.title}</a>
                </div>
            ))}
        </div>
        <div class="pagination">
            {p != 1 && <a href={`?p=${p - 1}&q=${q}`}>前に戻る</a>}{p != sarch.body.lastPage && <a href={`?p=${p + 1}&q=${q}`}>次に進む</a>}
        </div>
    </>)
})