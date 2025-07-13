import {createRoute} from "honox/factory"
import {User} from "@/types"
import { url2imageURL,host,cache } from "@/util"
import {fetch} from "@/fetch"
import { UserHome } from "@/types/user"

export default createRoute(async (c) => {
    const userId = c.req.param('id')
    // const topURL = `https://www.pixiv.net/ajax/user/${userId}/profile/top`
    const userURL = `https://www.pixiv.net/touch/ajax/user/details?id=${userId}`
    const homeURL = `https://www.pixiv.net/touch/ajax/user/home?id=${userId}`
    // const topresp = fetch(topURL)
    const userresp = fetch(userURL)
    const homeresp = fetch(homeURL)
    const [user,home] = await Promise.all([userresp, homeresp])
    // const topdata = await cache(topURL,top).json() as UserTop
    const userdata = await cache(userURL,user).json() as User
    const homedata = await cache(homeURL,home).json() as UserHome
    return c.render(<>
        <h1>{userdata.body.user_details.user_name}</h1>
        <div dangerouslySetInnerHTML={{__html:userdata.body.user_details.user_comment_html}}></div>
        <img loading="lazy" src={url2imageURL(userdata.body.user_details.profile_img.main)} alt="プロフィール画像" />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {userdata.body.user_details.social.twitter.url && <a href={userdata.body.user_details.social.twitter.url} target="_blank">Twitter</a>}
            {userdata.body.user_details.user_webpage && <a href={userdata.body.user_details.user_webpage.startsWith("http") ? userdata.body.user_details.user_webpage : `https://${userdata.body.user_details.user_webpage}`} target="_blank">Webサイト</a>}
        </div>
        <h2>イラスト|漫画</h2>
        <div class="list-base-grid">
        {Object.values(homedata.body.work_sets.all.data).map((illust) => (
            <div key={illust.id} class="list-base-item">
                <img loading="lazy" src={url2imageURL(illust.url)} alt={illust.title} class="list-base-image"/>
                <a href={`/artworks/${illust.id}`}>{illust.title}</a>
            </div>
        ))}
        </div>
        <a href={`/user/${userId}/illusts`}>イラストをもっと見る</a><br />
        <a href={`/user/${userId}/comics`}>漫画をもっと見る</a>
        <h2>小説</h2>
        <div class="list-base-grid">
            {Object.values(homedata.body.work_sets.novels.data).map((novel) => (
                <div key={novel.id} class="list-base-item">
                    <img loading="lazy" src={url2imageURL(novel.url)} alt={novel.title} class="list-base-image" />
                    <a href={`/novel/${novel.id}`}>{novel.title}</a>
                </div>
            ))}
        </div>
        <a href={`/user/${userId}/novels`}>小説をもっと見る</a>
    </>
    )
})