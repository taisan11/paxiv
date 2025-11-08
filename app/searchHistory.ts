type SearchHistoryItem = {
    id: string; // internal id
    term: string; // 検索語
    filters?: Record<string, unknown>; // 検索時に使ったフィルタ情報（オプショナル）
    resultsCount?: number; // 検索結果数（オプショナル）
    searchedAt: number; // タイムスタンプ
};

const SEARCH_HISTORY_KEY = 'searchHistory_v1';
const MAX_SEARCH_HISTORY = 200; // 最大保存件数

function makeId() {
    return `${Date.now()}_${Math.random().toString(36).slice(2,9)}`;
}

function stableStringify(obj: unknown) {
    // シンプルかつ十分な安定的文字列化（プロパティ順をソート）
    if (obj === null || obj === undefined) return String(obj);
    if (typeof obj !== 'object') return String(obj);
    try {
        const allKeys: string[] = [];
        JSON.stringify(obj, (k, v) => {
            allKeys.push(k);
            return v;
        });
        // 再構築してkeyをソートして出力
        const normalize = (o: any): any => {
            if (o === null || typeof o !== 'object') return o;
            if (Array.isArray(o)) return o.map(normalize);
            const keys = Object.keys(o).sort();
            const out: Record<string, any> = {};
            for (const k of keys) out[k] = normalize(o[k]);
            return out;
        };
        return JSON.stringify(normalize(obj));
    } catch {
        return String(obj);
    }
}

export function getSearchHistory(): SearchHistoryItem[] {
    const data = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data) as SearchHistoryItem[];
    } catch {
        return [];
    }
}

export function addSearch(term: string, options?: { filters?: Record<string, unknown>; resultsCount?: number }) {
    const history = getSearchHistory();
    const filters = options?.filters;
    const resultsCount = options?.resultsCount;

    // 重複判定: term + filters の等価性で判断
    const signature = `${term}::${stableStringify(filters)}"`;
    const filtered = history.filter(h => {
        const sig = `${h.term}::${stableStringify(h.filters)}"`;
        return sig !== signature;
    });

    const item: SearchHistoryItem = {
        id: makeId(),
        term,
        filters,
        resultsCount,
        searchedAt: Date.now(),
    };

    filtered.unshift(item);
    const limited = filtered.slice(0, MAX_SEARCH_HISTORY);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(limited));
}

export function removeSearch(id: string) {
    const history = getSearchHistory();
    const filtered = history.filter(h => h.id !== id);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filtered));
}

export function clearSearchHistory() {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
}

// ユーティリティ: 指定語で絞る（フロントでの利用を想定）
export function searchHistoryFilter(predicate: (item: SearchHistoryItem) => boolean) {
    return getSearchHistory().filter(predicate);
}

// 小さな互換関数: 履歴をUIにレンダリングしやすい形で取得
export function listSearchHistory() {
    return getSearchHistory();
}
