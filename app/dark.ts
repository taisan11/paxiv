// テーマ切り替え機能（localStorageから取得して適用するだけ）
type Theme = 'light' | 'dark' | 'auto';

function getCurrentTheme(): Theme {
    return (localStorage.getItem('thema') as Theme) || 'auto';
}

function applyTheme(theme: Theme): void {
    const html = document.documentElement;
    html.removeAttribute('data-theme');
    if (theme === 'light') {
        console.log("らいと")
        html.setAttribute('data-theme', 'light');
    } else if (theme === 'dark') {
        console.log("だーく")
        html.setAttribute('data-theme', 'dark');
    }
    console.log("おーと...?")
    // 'auto'の場合は何も設定しない
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
    console.log("Current theme:", theme);
    applyTheme(theme);
    addThemeChangeListener(getCurrentTheme, applyTheme);
});
