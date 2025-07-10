export function SearchBox() {
    return (
        <form action="/search" method="get" class="searchbox-form">
            <input type="text" name="q" id="q" placeholder="キーワード" />
            <button type="submit">検索</button>
        </form>
    );
}