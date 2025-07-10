import {createRoute} from "honox/factory"
import type {searchmanga} from "@/types/search"
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
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/search/illusts?word=${encodeURIComponent(q)}&type=manga&p=${p}`)).json() as searchmanga
    sarch.body.illusts = sarch.body.illusts.filter((v) => v.id)
    sarch.body.illusts = sarch.body.illusts.sort((a, b) => parseInt(b.id) - parseInt(a.id))
    return c.render(<>
        <h1>{q}の検索結果</h1>
        <nav className="search-tab-bar">
            <a href={`/search?q=${q}`}>トップ</a>
            <a href={`/search/i?q=${q}`}>イラスト</a>
            <a href={`/search/m?q=${q}`}>マンガ</a>
            <a href={`/search/n?q=${q}`}>ノベル</a>
        </nav>
        <div class="search-grid">
            {sarch.body.illusts.map((v) => (
            <div key={v.id} class="search-item">
                <img loading="lazy" src={url2imageURL(v.url, host(c))} alt={v.title} class="search-img"/>
                <a href={`/artworks/${v.id}`}>{v.title}を見る</a>
            </div>
            ))}
        </div>
        <div class="pagination">
            {p != 1 && <a href={`?p=${p - 1}&q=${q}`}>前に戻る</a>}{p != sarch.body.lastPage && <a href={`?p=${p + 1}&q=${q}`}>次に進む</a>}
        </div>
    </>)
})