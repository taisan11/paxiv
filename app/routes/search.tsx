import {createRoute} from "honox/factory"
import type {Sarch} from "@/types"
import {fetch} from "@/fetch"
import { host,url2imageURL } from "@/util"

export default createRoute(async(c)=>{
    const q = c.req.query("q")
    if (!q) return c.render(<>
        <h1>検索</h1>
        <form action="/search" method="get">
            <input type="text" name="q" id="q" placeholder="キーワード" />
            <button type="submit">検索</button>
        </form>
    </>)
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/tag_portal?word=${encodeURIComponent(q)}&version=92ab2445159f62490b3ba509f289ab9350438edb`)).json() as Sarch
    console.log(sarch.body.illusts[0])
    return c.render(<>
        <h1>{sarch.body.tag}の検索結果</h1>
        {sarch.body.illusts.map((v) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img loading="lazy" src={url2imageURL(v.url, host(c))} alt={v.title} />
                <a href={`/artworks/${v.id}`}>{v.title}を見る</a>
            </div>
        ))}
    </>)
})