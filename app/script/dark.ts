// テーマ切り替え機能（localStorageから取得して適用するだけ）
type Theme = 'light' | 'dark' | 'auto';

function getCurrentTheme(): Theme {
    return (localStorage.getItem('thema') as Theme) || 'auto';
}

function applyTheme(theme: Theme): void {
    const html = document.documentElement;
    html.removeAttribute('data-theme');
    if (theme === 'light') {
        html.setAttribute('data-theme', 'light');
    } else if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    }
    // 'auto'の場合は何もしない
}

function addThemeChangeListener(getTheme: () => Theme, apply: (theme: Theme) => void): void {
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', () => {
            if (getTheme() === 'auto') {
                apply(getTheme());
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const theme = getCurrentTheme();
    applyTheme(theme);
    addThemeChangeListener(getCurrentTheme, applyTheme);
});
