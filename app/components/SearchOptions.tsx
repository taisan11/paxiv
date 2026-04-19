import type { FC } from 'hono/jsx'
import { Script } from "@/components/Script"

export type SearchWorkKind = "illust" | "manga" | "novel"

interface SearchModeOption {
    value: string
    label: string
}

const SEARCH_MODE_OPTIONS: Record<SearchWorkKind, SearchModeOption[]> = {
    illust: [
        { value: "s_tag_full", label: "完全一致" },
        { value: "s_tag", label: "タグ一致" },
        { value: "s_tc", label: "タイトル・キャプション一致" },
        { value: "s_text", label: "タイトルタグキャプション" }
    ],
    manga: [
        { value: "s_tag_full", label: "完全一致" },
        { value: "s_tag", label: "タグ一致" },
        { value: "s_tc", label: "タイトル・キャプション一致" },
        { value: "s_text", label: "タイトルタグキャプション" }
    ],
    novel: [
        { value: "s_tag_full", label: "完全一致" },
        { value: "s_tag", label: "タグ一致" },
        { value: "s_text", label: "本文検索" }
    ]
}

export function normalizeSearchMode(workKind: SearchWorkKind, raw: string | undefined): string {
    const options = SEARCH_MODE_OPTIONS[workKind]
    const fallback = "s_tag_full"
    if (!raw) {
        return fallback
    }
    return options.some((option) => option.value === raw) ? raw : fallback
}

interface SearchOptionsProps {
    formAction: string
    showSeriesGroup?: boolean
    showWorkLang?: boolean
    showType?: boolean
    currentQuery?: string
    searchWorkKind?: SearchWorkKind
}

export const SearchOptions: FC<SearchOptionsProps> = ({ 
    formAction, 
    showSeriesGroup = false, 
    showWorkLang = false, 
    showType = false,
    currentQuery = "",
    searchWorkKind = "illust"
}) => {
    const sModeOptions = SEARCH_MODE_OPTIONS[searchWorkKind]
    const defaultSMode = "s_tag_full"

    return (
        <>
            <Script src='/app/script/search-options.ts' />
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
                                <select name="s_mode" id="s_mode" data-default-mode={defaultSMode}>
                                    {sModeOptions.map((mode) => (
                                        <option value={mode.value} key={mode.value}>{mode.label}</option>
                                    ))}
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
        </>
    )
}
