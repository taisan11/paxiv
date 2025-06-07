import {createRoute} from "honox/factory"
import {UserIllusts} from "@/types"
import { url2imageURL,host,cache } from "@/util"
import {fetch} from "@/fetch"

export default createRoute(async (c) => {
    const userId = c.req.param('id')
    const p = Number(c.req.query("p")) || 1
    const iluAPIurl = `https://www.pixiv.net/touch/ajax/user/illusts?id=${userId}&p=${p}&type=manga`
    const illustsresp = cache(iluAPIurl,await fetch(iluAPIurl))
    const illustsdata = await illustsresp.json() as UserIllusts
    return c.render(<>
        <h1>{illustsdata.body.meta.title}</h1>
        <p>合計{illustsdata.body.total}個のイラスト</p>
        {illustsdata.body.illusts.map((illust) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img loading="lazy" src={url2imageURL(illust.url, host(c))} alt={illust.title} />
                <a href={`/artworks/${illust.id}`} target="_blank">{illust.title}</a>
            </div>
        ))}
        {p != 1 && <a href={`?p=${p - 1}`}>前に戻る</a>}{p != illustsdata.body.lastPage && <a href={`?p=${p + 1}`}>次に進む</a>}
    </>
    )
})