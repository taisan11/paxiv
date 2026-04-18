import {createRoute} from "honox/factory"
import {AjaxUserResponse, AjaxUserProfileTopResponse} from "@/types/ajax"
import { url2imageURL, sanitizeHtml, normalizePixivMapValues } from "@/util"
import { fetchPixivJson } from "@/pixiv-api"
import {Script} from "@/components/Script"

export default createRoute(async (c) => {
    const userId = c.req.param('id')
    const userURL = `https://www.pixiv.net/ajax/user/${userId}?full=1`
    const homeURL = `https://www.pixiv.net/ajax/user/${userId}/profile/top?sensitiveFilterMode=userSetting`
    const [userdata, homedata] = await Promise.all([
        fetchPixivJson<AjaxUserResponse>(c, userURL),
        fetchPixivJson<AjaxUserProfileTopResponse>(c, homeURL)
    ])
    if (userdata.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{userdata.message || "ユーザー情報の取得に失敗しました。"}</p>
        </>)
    }
    if (homedata.error) {
        return c.render(<>
            <h1>エラー</h1>
            <p>{homedata.message || "作品情報の取得に失敗しました。"}</p>
        </>)
    }

    const illusts = normalizePixivMapValues(homedata.body.illusts)
    const mangas = normalizePixivMapValues(homedata.body.manga)
    const novels = normalizePixivMapValues(homedata.body.novels)
    const social = userdata.body.social
    const twitterUrl = !Array.isArray(social) ? social.twitter?.url : undefined

    return c.render(<>
        <Script src='/app/script/activity.ts' />
        <h1>{userdata.body.name}</h1>
        <div class="client-action-bar">
            <button
                id="follow-toggle"
                class="client-action-btn"
                data-user-id={userdata.body.userId}
                data-user-name={userdata.body.name}
                type="button"
            >
                フォローする
            </button>
        </div>
        <div dangerouslySetInnerHTML={{__html:sanitizeHtml(userdata.body.commentHtml)}}></div>
        <img loading="lazy" src={url2imageURL(userdata.body.imageBig || userdata.body.image)} alt="プロフィール画像" />
        <div class="inline-links">
            {twitterUrl && <a href={twitterUrl} target="_blank" rel="noopener noreferrer">Twitter</a>}
            {userdata.body.webpage && <a href={userdata.body.webpage.startsWith("http") ? userdata.body.webpage : `https://${userdata.body.webpage}`} target="_blank" rel="noopener noreferrer">Webサイト</a>}
        </div>
        <h2>イラスト|漫画</h2>
        {[...illusts, ...mangas].length === 0 ? (
            <p class="empty-state">公開されているイラスト・マンガがありません。</p>
        ) : (
            <div class="list-base-grid">
            {[...illusts, ...mangas].map((illust) => (
                <a href={`/artworks/${illust.id}`} key={illust.id} class="list-base-item">
                    <img loading="lazy" src={url2imageURL(illust.url)} alt={illust.title} class="list-base-img"/>
                </a>
            ))}
            </div>
        )}
        <a href={`/users/${userId}/illusts`}>イラストをもっと見る</a><br />
        <a href={`/users/${userId}/manga`}>漫画をもっと見る</a>
        <h2>小説</h2>
        {novels.length === 0 ? (
            <p class="empty-state">公開されている小説がありません。</p>
        ) : (
            <div class="list-base-grid">
                {novels.map((novel) => (
                    <a href={`/novel/${novel.id}`} key={novel.id} class="list-base-item">
                        <img
                            loading="lazy"
                            src={url2imageURL(novel.url || novel.cover?.urls["480mw"] || novel.cover?.urls.original || "")}
                            alt={novel.title}
                            class="list-base-img"
                        />
                    </a>
                ))}
            </div>
        )}
        <a href={`/users/${userId}/novels`}>小説をもっと見る</a>
    </>
    )
})
