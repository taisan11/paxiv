// 検索オプションの表示/非表示切り替え
window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('search-options-toggle');
    const content = document.getElementById('search-options-content');
    
    if (toggle && content) {
        toggle.addEventListener('click', () => {
            content.classList.toggle('active');
            toggle.textContent = content.classList.contains('active') ? 
                '検索オプションを閉じる' : '検索オプションを開く';
        });
    }
    
    // URLパラメータからオプションの初期値を設定
    const urlParams = new URLSearchParams(window.location.search);
    
    // AI作品ブロック
    const aiBlockCheckbox = document.getElementById('ai_block') as HTMLInputElement | null;
    if (aiBlockCheckbox) {
        aiBlockCheckbox.checked = urlParams.get('ai_type') === '1';
    }
    
    // 同じ作者まとめ
    const authorGroupCheckbox = document.getElementById('author_group') as HTMLInputElement | null;
    if (authorGroupCheckbox) {
        authorGroupCheckbox.checked = urlParams.get('csw') === '1';
    }
    
    // シリーズ単位表示（小説のみ）
    const seriesGroupCheckbox = document.getElementById('series_group') as HTMLInputElement | null;
    if (seriesGroupCheckbox) {
        seriesGroupCheckbox.checked = urlParams.get('gs') === '1';
    }
    
    // 検索モード
    const searchModeSelect = document.getElementById('s_mode') as HTMLSelectElement | null;
    if (searchModeSelect) {
        const sMode = urlParams.get('s_mode') || 's_tag';
        searchModeSelect.value = sMode;
    }
    
    // 作品タイプ（イラスト検索のみ）
    const typeSelect = document.getElementById('type') as HTMLSelectElement | null;
    if (typeSelect) {
        const type = urlParams.get('type') || 'illust_and_ugoira';
        typeSelect.value = type;
    }
    
    // 言語設定（小説のみ）
    const workLangSelect = document.getElementById('work_lang') as HTMLSelectElement | null;
    if (workLangSelect) {
        const workLang = urlParams.get('work_lang') || 'ja';
        workLangSelect.value = workLang;
    }
    
    // フォーム送信をインターセプトしてオプションを追加
    const searchForms = document.querySelectorAll('form[action*="/search"]');
    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form as HTMLFormElement);
            const params = new URLSearchParams();
            
            // 基本パラメータ
            const q = formData.get('q') as string;
            if (q) params.set('q', q);
            
            // AI作品ブロック
            if (formData.get('ai_block')) {
                params.set('ai_type', '1');
            }
            
            // 同じ作者まとめ
            if (formData.get('author_group')) {
                params.set('csw', '1');
            }
            
            // シリーズ単位表示
            if (formData.get('series_group')) {
                params.set('gs', '1');
            }
            
            // 検索モード
            const sMode = formData.get('s_mode') as string;
            if (sMode && sMode !== 's_tag') {
                params.set('s_mode', sMode);
            }
            
            // 作品タイプ
            const type = formData.get('type') as string;
            if (type && type !== 'illust_and_ugoira') {
                params.set('type', type);
            }
            
            // 言語設定
            const workLang = formData.get('work_lang') as string;
            if (workLang && workLang !== 'ja') {
                params.set('work_lang', workLang);
            }
            
            const action = (form as HTMLFormElement).action;
            window.location.href = `${action}?${params.toString()}`;
        });
    });
});


