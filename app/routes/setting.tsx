import { createRoute } from "honox/factory"
import {getCookie,setCookie} from "hono/cookie"
import {Script} from "@/components/Script"

export default createRoute(async (c) => {
    return c.render(
        <>
            <Script src='/app/script/setting.ts' />
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
            <h2>小説の表示設定</h2>
            <p>小説ページでのテキスト表示設定です。設定はブラウザに保存されます。</p>
            <div>
                <label for="novel-font-family">フォント: </label>
                <select name="novel-font-family" id="novel-font-family">
                    <option value="serif">明朝体（serif）</option>
                    <option value="sans-serif">ゴシック体（sans-serif）</option>
                    <option value="monospace">等幅（monospace）</option>
                </select>
            </div>
            <div>
                <label for="novel-font-size">文字サイズ: </label>
                <select name="novel-font-size" id="novel-font-size">
                    <option value="small">小（14px）</option>
                    <option value="medium">中（16px）</option>
                    <option value="large">大（18px）</option>
                    <option value="xlarge">特大（22px）</option>
                </select>
            </div>
            <div>
                <label for="novel-line-height">行間: </label>
                <select name="novel-line-height" id="novel-line-height">
                    <option value="compact">狭め</option>
                    <option value="normal">標準</option>
                    <option value="wide">広め</option>
                </select>
            </div>
            <div>
                <label for="novel-letter-spacing">文字間隔: </label>
                <select name="novel-letter-spacing" id="novel-letter-spacing">
                    <option value="normal">標準</option>
                    <option value="wide">少し広め</option>
                    <option value="wider">広め</option>
                </select>
            </div>
            <h2>ログイン情報</h2>
            <p>ログイン情報はcookieに保存されます。</p>
            <p>
                <strong>Pixiv認証について:</strong><br />
                HAR上では、認証付きAPIで <code>PHPSESSID</code>（Cookie）と <code>x-user-id</code> が継続的に送信され、
                書き込み系では <code>X-Csrf-Token</code> も付与されます。<br />
                Paxivではこの3つを保存すると、必要な <code>accept</code> / <code>accept-language</code> /
                <code>referer</code> / <code>origin</code> ヘッダーと合わせて自動で付与します。<br />
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
        setCookie(c, "PHPSESSID", PHPSESSID, { path: "/", httpOnly: true, secure: true, sameSite: "Strict" });
    }
    if (csrfToken) {
        setCookie(c, "X-Csrf-Token", csrfToken, { path: "/", httpOnly: true, secure: true, sameSite: "Strict" });
    }
    if (userId) {
        setCookie(c, "userId", userId, { path: "/", httpOnly: true, secure: true, sameSite: "Strict" });
    }
    return c.redirect("/setting");
});
