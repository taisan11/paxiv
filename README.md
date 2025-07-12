## 認証について
pixivの認証はcookie(特にPHPSESSID),X-Csrf-Tokenヘッダーが必要です。
X-Csrf-Tokenはブラウザで下記のスクリプトを実行することで取得できます。
X-Csrf-Tokenは未ログイン時はランダムに変わります。
`console.log(JSON.parse(JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).props.pageProps.serverSerializedPreloadedState).api.token)`