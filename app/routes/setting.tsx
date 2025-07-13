import { createRoute } from "honox/factory"
import {getCookie,setCookie} from "hono/cookie"
import {Script} from "honox/server"

export default createRoute(async (c) => {
    return c.render(
        <>
            <Script src='/app/setting.ts' />
            <h1>設定</h1>
            <a href="/">トップページに戻る</a>
            <h2>レイアウト</h2>
            <p>カラーテーマを選択してください。</p>
            <select name="thema" id="thema">
                <option value="light">ライト</option>
                <option value="dark">ダーク</option>
                <option value="auto">自動</option>
            </select>
            <button id="save-thema">テーマを保存</button>
            <h2>ログイン情報</h2>
            <p>ログイン情報はcookieに保存されます。</p>
            <p>
                <strong>Pixiv認証について:</strong><br />
                Pixivの認証には <code>PHPSESSID</code> Cookie と <code>X-Csrf-Token</code> ヘッダーが必要です。<br />
                <code>X-Csrf-Token</code> は下記のスクリプトをPixivのページで実行して取得できます。<br />
                <pre>
{`console.log(JSON.parse(JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).props.pageProps.serverSerializedPreloadedState).api.token)`}
                </pre>
            </p>
            <form action="/setting" method="post">
                <label>
                    <span>PHPSESSID Cookie:</span>
                    <input type="text" name="PHPSESSID" defaultValue={getCookie(c, "PHPSESSID") || ""} />
                </label><br />
                <label>
                    <span>X-Csrf-Token ヘッダー:</span>
                    <input type="text" name="X-Csrf-Token" defaultValue={getCookie(c, "X-Csrf-Token") || ""} />
                </label><br />
                <label>
                    <span>PixivのユーザーID:</span>
                    <input type="text" name="userId" defaultValue={getCookie(c, "userId") || ""} />
                </label><br />
                <button type="submit">ログイン</button>
            </form>
        </>
    );
});

export const POST = createRoute(async (c) => {
    const formData = await c.req.formData();
    const PHPSESSID = formData.get("PHPSESSID")?.toString() || "";
    const csrfToken = formData.get("X-Csrf-Token")?.toString() || "";
    const userId = formData.get("userId")?.toString() || "";

    if (PHPSESSID) {
        setCookie(c, "PHPSESSID", PHPSESSID, { path: "/", httpOnly: true });
    }
    if (csrfToken) {
        setCookie(c, "X-Csrf-Token", csrfToken, { path: "/", httpOnly: true });
    }
    if (userId) {
        setCookie(c, "userId", userId, { path: "/", httpOnly: true });
    }
    return c.redirect("/setting");
});