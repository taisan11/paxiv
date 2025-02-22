import {createRoute} from "honox/factory"
import {UserTop,User} from "@/types"
import { url2imageURL,host,cache } from "@/util"

export default createRoute(async (c) => {
    const userId = c.req.param('id')
    const topURL = `https://www.pixiv.net/ajax/user/${userId}/profile/top`
    const userURL = `https://www.pixiv.net/touch/ajax/user/details?id=${userId}`
    const topresp = fetch(topURL)
    const userresp = fetch(userURL)
    const [top, user] = await Promise.all([topresp, userresp])
    const topdata: UserTop = await cache(topURL,top).json()
    const userdata: User = await cache(userURL,user).json()
    return c.render(<>
        <h1>{userdata.body.user_details.user_name}</h1>
        <div __dangerouslySetInnerHTML={userdata.body.user_details.user_comment_html}></div>
        <img loading="lazy" src={url2imageURL(userdata.body.user_details.profile_img.main, host(c))} alt="プロフィール画像" />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {userdata.body.user_details.social.twitter.url && <a href={userdata.body.user_details.social.twitter.url} target="_blank">Twitter</a>}
            {userdata.body.user_details.user_webpage && <a href={userdata.body.user_details.user_webpage.startsWith("http") ? userdata.body.user_details.user_webpage : `https://${userdata.body.user_details.user_webpage}`} target="_blank">Webサイト</a>}
        </div>
        <h2>イラスト</h2>
        {Object.values(topdata.body.illusts).map((illust) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img loading="lazy" src={url2imageURL(illust.url, host(c))} alt={illust.title} />
                <a href={`https://www.pixiv.net/artworks/${illust.id}`} target="_blank">{illust.title}</a>
            </div>
        ))}
        <a href={`/users/${userId}/illusts`}>もっと見る</a>
        <h2>漫画</h2>
        {Object.values(topdata.body.manga).map((manga) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img loading="lazy" src={url2imageURL(manga.url, host(c))} alt={manga.title} />
                <a href={`https://www.pixiv.net/artworks/${manga.id}`} target="_blank">{manga.title}</a>
            </div>
        ))}
        <a href={`/users/${userId}/comics`}>もっと見る</a>
    </>
    )
})