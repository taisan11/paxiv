import type { FC } from 'hono/jsx'

interface SearchOptionsProps {
    formAction: string
    showSeriesGroup?: boolean
    showWorkLang?: boolean
    showType?: boolean
    currentQuery?: string
    showOptions?: boolean
}

export const SearchOptions: FC<SearchOptionsProps> = ({ 
    formAction, 
    showSeriesGroup = false, 
    showWorkLang = false, 
    showType = false,
    currentQuery = "",
}) => {
    return (
        <form action={formAction} method="get" class="searchbox-form">
            <input type="text" name="q" id="q" placeholder="キーワード" value={currentQuery} />
            
                <div class="search-options">
                    <button type="button" id="search-options-toggle">検索オプション</button>
                    <div id="search-options-content" class="search-options-content">
                        <div class="option-group">
                            <label class="checkbox-label">
                                <input type="checkbox" name="ai_block" id="ai_block" />
                                AI作品をブロック
                            </label>
                        </div>
                        <div class="option-group">
                            <label class="checkbox-label">
                                <input type="checkbox" name="author_group" id="author_group" />
                                同じ作者の作品をまとめる
                            </label>
                        </div>
                        {showSeriesGroup && (
                            <div class="option-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" name="series_group" id="series_group" />
                                    シリーズ単位で表示
                                </label>
                            </div>
                        )}
                        <div class="option-group">
                            <label for="s_mode">検索モード</label>
                            <select name="s_mode" id="s_mode">
                                <option value="s_tag">タグ</option>
                                <option value="s_tc">タイトル・キャプション</option>
                                <option value="s_tag_full">完全一致タグ</option>
                            </select>
                        </div>
                        {showType && (
                            <div class="option-group">
                                <label for="type">作品タイプ</label>
                                <select name="type" id="type">
                                    <option value="illust_and_ugoira">イラスト・うごイラ</option>
                                    <option value="illust">イラストのみ</option>
                                    <option value="ugoira">うごイラのみ</option>
                                </select>
                            </div>
                        )}
                        {showWorkLang && (
                            <div class="option-group">
                                <label for="work_lang">言語</label>
                                <select name="work_lang" id="work_lang">
                                    <option value="ja">日本語</option>
                                    <option value="en">英語</option>
                                    <option value="zh">中国語</option>
                                    <option value="ko">韓国語</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            
            <button type="submit">検索</button>
        </form>
    )
}

// 後方互換性のためのエイリアス
export const SearchBox = () => <SearchOptions formAction="/search" showOptions={false} />
