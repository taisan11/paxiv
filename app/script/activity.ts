type WorkType = 'artworks' | 'novel';
type HistorySection = 'history-artworks' | 'history-novel' | 'bookmarks-artworks' | 'bookmarks-novel' | 'follows';

type HistoryItem = {
    id: string;
    title: string;
    viewedAt: number;
    type: WorkType;
};

type BookmarkItem = {
    id: string;
    title: string;
    bookmarkedAt: number;
    type: WorkType;
};

type FollowItem = {
    id: string;
    name: string;
    followedAt: number;
};

const HISTORY_LIMIT = 1000;
const BOOKMARK_LIMIT = 1000;
const FOLLOW_LIMIT = 1000;

const FOLLOW_KEY = 'followUsers_v1';

function historyKey(type: WorkType): string {
    return `viewHistory_${type}`;
}

function bookmarkKey(type: WorkType): string {
    return `bookmark_${type}`;
}

function readItems<T>(key: string): T[] {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as T[]) : [];
    } catch {
        return [];
    }
}

function writeItems<T>(key: string, items: T[], limit: number): void {
    localStorage.setItem(key, JSON.stringify(items.slice(0, limit)));
}

function upsertById<T extends { id: string }>(items: T[], item: T): T[] {
    const filtered = items.filter((v) => v.id !== item.id);
    filtered.unshift(item);
    return filtered;
}

function getHistory(type: WorkType): HistoryItem[] {
    return readItems<HistoryItem>(historyKey(type));
}

function saveHistory(item: HistoryItem): void {
    const history = getHistory(item.type);
    const updated = upsertById(history, {
        ...item,
        viewedAt: Date.now(),
    });
    writeItems(historyKey(item.type), updated, HISTORY_LIMIT);
}

function clearHistory(type: WorkType): void {
    localStorage.removeItem(historyKey(type));
}

function getBookmarks(type: WorkType): BookmarkItem[] {
    return readItems<BookmarkItem>(bookmarkKey(type));
}

function isBookmarked(type: WorkType, id: string): boolean {
    return getBookmarks(type).some((v) => v.id === id);
}

function toggleBookmark(item: BookmarkItem): boolean {
    const bookmarks = getBookmarks(item.type);
    const exists = bookmarks.some((v) => v.id === item.id);
    if (exists) {
        const filtered = bookmarks.filter((v) => v.id !== item.id);
        writeItems(bookmarkKey(item.type), filtered, BOOKMARK_LIMIT);
        return false;
    }
    const updated = upsertById(bookmarks, {
        ...item,
        bookmarkedAt: Date.now(),
    });
    writeItems(bookmarkKey(item.type), updated, BOOKMARK_LIMIT);
    return true;
}

function clearBookmarks(type: WorkType): void {
    localStorage.removeItem(bookmarkKey(type));
}

function getFollows(): FollowItem[] {
    return readItems<FollowItem>(FOLLOW_KEY);
}

function isFollowing(id: string): boolean {
    return getFollows().some((v) => v.id === id);
}

function toggleFollow(item: FollowItem): boolean {
    const follows = getFollows();
    const exists = follows.some((v) => v.id === item.id);
    if (exists) {
        const filtered = follows.filter((v) => v.id !== item.id);
        writeItems(FOLLOW_KEY, filtered, FOLLOW_LIMIT);
        return false;
    }
    const updated = upsertById(follows, {
        ...item,
        followedAt: Date.now(),
    });
    writeItems(FOLLOW_KEY, updated, FOLLOW_LIMIT);
    return true;
}

function clearFollows(): void {
    localStorage.removeItem(FOLLOW_KEY);
}

function renderHistorySection(section: HistorySection, list: HTMLElement): number {
    const fragment = document.createDocumentFragment();

    const createListItem = (href: string, label: string, timestamp: number): void => {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        const date = document.createElement('span');
        anchor.href = href;
        anchor.textContent = label;
        date.textContent = new Date(timestamp).toLocaleString();
        li.append(anchor, date);
        fragment.appendChild(li);
    };

    let count = 0;
    if (section === 'history-artworks') {
        const items = getHistory('artworks');
        for (const item of items) {
            createListItem(`/artworks/${item.id}`, item.title, item.viewedAt);
        }
        count = items.length;
    } else if (section === 'history-novel') {
        const items = getHistory('novel');
        for (const item of items) {
            createListItem(`/novel/${item.id}`, item.title, item.viewedAt);
        }
        count = items.length;
    } else if (section === 'bookmarks-artworks') {
        const items = getBookmarks('artworks');
        for (const item of items) {
            createListItem(`/artworks/${item.id}`, item.title, item.bookmarkedAt);
        }
        count = items.length;
    } else if (section === 'bookmarks-novel') {
        const items = getBookmarks('novel');
        for (const item of items) {
            createListItem(`/novel/${item.id}`, item.title, item.bookmarkedAt);
        }
        count = items.length;
    } else if (section === 'follows') {
        const items = getFollows();
        for (const item of items) {
            createListItem(`/users/${item.id}`, item.name, item.followedAt);
        }
        count = items.length;
    }

    list.replaceChildren();
    if (count === 0) {
        const empty = document.createElement('li');
        if (section === 'history-artworks' || section === 'history-novel') {
            empty.textContent = '閲覧履歴はありません。';
        } else if (section === 'follows') {
            empty.textContent = 'フォロー中のユーザーはいません。';
        } else {
            empty.textContent = 'ブックマークはありません。';
        }
        list.appendChild(empty);
        return 0;
    }

    list.appendChild(fragment);
    return count;
}

function clearBySection(section: HistorySection): void {
    if (section === 'history-artworks') {
        clearHistory('artworks');
    } else if (section === 'history-novel') {
        clearHistory('novel');
    } else if (section === 'bookmarks-artworks') {
        clearBookmarks('artworks');
    } else if (section === 'bookmarks-novel') {
        clearBookmarks('novel');
    } else if (section === 'follows') {
        clearFollows();
    }
}

function clearConfirmMessage(section: HistorySection): string {
    if (section === 'history-artworks') return 'イラスト・漫画の閲覧履歴を削除しますか？';
    if (section === 'history-novel') return '小説の閲覧履歴を削除しますか？';
    if (section === 'bookmarks-artworks') return 'イラスト・漫画のブックマークを削除しますか？';
    if (section === 'bookmarks-novel') return '小説のブックマークを削除しますか？';
    return 'フォロー中ユーザーを削除しますか？';
}

function initHistoryTracking(): void {
    const match = location.pathname.match(/^\/(artworks|novel)\/([^\/?#]+)$/);
    if (!match) return;
    const [, type, id] = match as [string, WorkType, string];
    const title = document.getElementById('title')?.textContent?.trim() || 'paxiv:タイトルが取得できませんでした';
    saveHistory({
        id,
        title,
        viewedAt: Date.now(),
        type,
    });
}

function initBookmarkToggle(): void {
    const button = document.getElementById('bookmark-toggle') as HTMLButtonElement | null;
    if (!button) return;
    const type = button.dataset.bookmarkType as WorkType | undefined;
    const id = button.dataset.itemId;
    if (!type || (type !== 'artworks' && type !== 'novel') || !id) return;
    const title = button.dataset.itemTitle || document.getElementById('title')?.textContent?.trim() || 'タイトル不明';

    const syncState = (): void => {
        const active = isBookmarked(type, id);
        button.textContent = active ? 'ブックマーク解除' : 'ブックマークする';
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    };

    button.addEventListener('click', () => {
        toggleBookmark({
            id,
            title,
            bookmarkedAt: Date.now(),
            type,
        });
        syncState();
    });

    syncState();
}

function initFollowToggle(): void {
    const button = document.getElementById('follow-toggle') as HTMLButtonElement | null;
    if (!button) return;
    const userId = button.dataset.userId;
    if (!userId) return;
    const userName = button.dataset.userName || 'ユーザー';

    const syncState = (): void => {
        const active = isFollowing(userId);
        button.textContent = active ? 'フォロー解除' : 'フォローする';
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    };

    button.addEventListener('click', () => {
        toggleFollow({
            id: userId,
            name: userName,
            followedAt: Date.now(),
        });
        syncState();
    });

    syncState();
}

function initHistoryPage(): void {
    const list = document.getElementById('history-list');
    const clearButton = document.getElementById('clear-history-btn') as HTMLButtonElement | null;
    const tabButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-history-section]'));
    if (!list || !clearButton || tabButtons.length === 0) return;

    let activeSection: HistorySection =
        (tabButtons.find((btn) => btn.classList.contains('active'))?.dataset.historySection as HistorySection) ||
        'history-artworks';

    const updateTabState = (): void => {
        for (const button of tabButtons) {
            button.classList.toggle('active', button.dataset.historySection === activeSection);
        }
    };

    const render = (): void => {
        const count = renderHistorySection(activeSection, list);
        clearButton.style.display = count > 0 ? 'block' : 'none';
    };

    for (const button of tabButtons) {
        button.addEventListener('click', () => {
            const section = button.dataset.historySection as HistorySection | undefined;
            if (!section) return;
            activeSection = section;
            updateTabState();
            render();
        });
    }

    clearButton.addEventListener('click', () => {
        if (!confirm(clearConfirmMessage(activeSection))) return;
        clearBySection(activeSection);
        render();
    });

    updateTabState();
    render();
}

document.addEventListener('DOMContentLoaded', () => {
    initHistoryTracking();
    initBookmarkToggle();
    initFollowToggle();
    initHistoryPage();
});
