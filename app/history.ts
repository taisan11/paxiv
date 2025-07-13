type HistoryItem = {
    id: string; // 作品ID
    title: string;
    viewedAt: number; // 閲覧日時（タイムスタンプ）
    type: 'artworks' | 'novel'; // 作品の種類
};

function getHistoryKey(type: 'artworks' | 'novel') {
    return `viewHistory_${type}`;
}

export function saveHistory(item: HistoryItem) {
    const history = getHistory(item.type);
    // 既存の同じIDを削除
    const filtered = history.filter(h => h.id !== item.id);
    // 先頭に追加
    filtered.unshift({ ...item, viewedAt: Date.now() });
    // 最大件数制限（例: 1000件）
    const limited = filtered.slice(0, 1000);
    localStorage.setItem(getHistoryKey(item.type), JSON.stringify(limited));
}

export function getHistory(type: 'artworks' | 'novel'): HistoryItem[] {
    const data = localStorage.getItem(getHistoryKey(type));
    if (!data) return [];
    try {
        return JSON.parse(data) as HistoryItem[];
    } catch {
        return [];
    }
}

export function clearHistory(type: 'artworks' | 'novel') {
    localStorage.removeItem(getHistoryKey(type));
}

window.onload = () => {
    // 現在のURLからIDとタイプを判定して保存
    const match = location.pathname.match(/^\/(artworks|novel)\/([^\/]+)$/);
    let currentType: 'artworks' | 'novel' = 'artworks';
    
    if (match) {
        const [, type, id] = match;
        currentType = type as 'artworks' | 'novel';
        // タイトル取得（例: ページタイトルをそのまま使う）
        const title = document.getElementById("title")?.innerText || 'paxiv:タイトルが取得できませんでした';
        saveHistory({
            id,
            title,
            viewedAt: Date.now(),
            type: currentType
        });
    }

    // 履歴ページの場合のみタブとリストを初期化
    const historyList = document.getElementById('history-list');
    const artworksTab = document.getElementById('artworks-tab');
    const novelTab = document.getElementById('novel-tab');
    const clearButton = document.getElementById('clear-history-btn');
    
    if (historyList && artworksTab && novelTab) {
        let activeType = currentType;

        const renderHistory = (type: 'artworks' | 'novel') => {
            const history = getHistory(type);
            if (history.length > 0) {
                historyList.innerHTML = history.map(item => `
                    <li>
                        <a href="/${item.type}/${item.id}">${item.title}</a>
                        <span>${new Date(item.viewedAt).toLocaleString()}</span>
                    </li>
                `).join('');
            } else {
                historyList.innerHTML = '<li>閲覧履歴はありません。</li>';
            }
            
            // 削除ボタンの表示・非表示
            if (clearButton) {
                clearButton.style.display = history.length > 0 ? 'block' : 'none';
                clearButton.onclick = () => {
                    if (confirm(`${type === 'artworks' ? 'イラスト' : '小説'}の閲覧履歴を削除しますか？`)) {
                        clearHistory(type);
                        renderHistory(type);
                    }
                };
            }
        };

        const updateTabState = (type: 'artworks' | 'novel') => {
            artworksTab.className = type === 'artworks' ? 'active' : '';
            novelTab.className = type === 'novel' ? 'active' : '';
        };

        // タブクリックイベント
        artworksTab.onclick = () => {
            activeType = 'artworks';
            updateTabState(activeType);
            renderHistory(activeType);
        };

        novelTab.onclick = () => {
            activeType = 'novel';
            updateTabState(activeType);
            renderHistory(activeType);
        };

        // 初期表示
        updateTabState(activeType);
        renderHistory(activeType);
    }
}