import {createRoute} from "honox/factory"
import type {Sarch} from "@/types"
import {fetch} from "@/fetch"
import { host,url2imageURL } from "@/util"

export default createRoute(async(c)=>{
    const q = c.req.query("q")
    const sarch = await (await fetch(`https://www.pixiv.net/touch/ajax/tag_portal?word=${q}`)).json() as Sarch
    return c.render(<>
        <h1>{sarch.body.tag}の検索結果</h1>
        {sarch.body.illusts.forEach((v) => {
            return (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <img loading="lazy" src={url2imageURL(v.url, host(c))} alt={v.title} />
                    <a href={`/artworks/${v.id}`}>{v.title}を見る</a>
                </div>
            )
        })}
        
    </>)
})