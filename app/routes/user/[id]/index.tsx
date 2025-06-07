import {createRoute} from "honox/factory"
import {UserTop,User} from "@/types"
import { url2imageURL,host,cache } from "@/util"
import {fetch} from "@/fetch"
import { UserHome } from "@/types/user"

export default createRoute(async (c) => {
    const userId = c.req.param('id')
    const topURL = `https://www.pixiv.net/ajax/user/${userId}/profile/top`
    const userURL = `https://www.pixiv.net/touch/ajax/user/details?id=${userId}`
    const homeURL = `https://www.pixiv.net/touch/ajax/user/home?id=${userId}`
    const topresp = fetch(topURL)
    const userresp = fetch(userURL)
    const homeresp = fetch(homeURL)
    const [top, user,home] = await Promise.all([topresp, userresp, homeresp])
    const topdata = await cache(topURL,top).json() as UserTop
    const userdata = await cache(userURL,user).json() as User
    const homedata = await cache(homeURL,home).json() as UserHome
    return c.render(<>
        <h1>{userdata.body.user_details.user_name}</h1>
        <div dangerouslySetInnerHTML={{__html:userdata.body.user_details.user_comment_html}}></div>
        <img loading="lazy" src={url2imageURL(userdata.body.user_details.profile_img.main, host(c))} alt="プロフィール画像" />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {userdata.body.user_details.social.twitter.url && <a href={userdata.body.user_details.social.twitter.url} target="_blank">Twitter</a>}
            {userdata.body.user_details.user_webpage && <a href={userdata.body.user_details.user_webpage.startsWith("http") ? userdata.body.user_details.user_webpage : `https://${userdata.body.user_details.user_webpage}`} target="_blank">Webサイト</a>}
        </div>
        <h2>イラスト</h2>
        {Object.values(topdata.body.illusts).map((illust) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img loading="lazy" src={url2imageURL(illust.url, host(c))} alt={illust.title} />
                <a href={`/artworks/${illust.id}`}>{illust.title}</a>
            </div>
        ))}
        <a href={`/user/${userId}/illusts`}>もっと見る</a>
        <h2>漫画</h2>
        {Object.values(topdata.body.manga).map((manga) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img loading="lazy" src={url2imageURL(manga.url, host(c))} alt={manga.title} />
                <a href={`https://www.pixiv.net/artworks/${manga.id}`} target="_blank">{manga.title}</a>
            </div>
        ))}
        <a href={`/user/${userId}/comics`}>もっと見る</a>
        <h2>小説</h2>
        {Object.values(homedata.body.work_sets.novels.data).map((novel) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img loading="lazy" src={url2imageURL(novel.url, host(c))} alt={novel.title} />
                <a href={`/novel/${novel.id}`}>{novel.title}</a>
            </div>
        ))}
    </>
    )
})