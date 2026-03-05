document.addEventListener('DOMContentLoaded', () => {
    // テーマ設定
    const themaSelect = document.getElementById('thema') as HTMLSelectElement | null;
    const saveButton = document.getElementById('save-thema') as HTMLButtonElement | null;

    if (themaSelect && saveButton) {
        const savedThema = localStorage.getItem('thema') || 'auto';
        if (savedThema && ['light', 'dark', 'auto'].includes(savedThema)) {
            themaSelect.value = savedThema;
        }

        saveButton.addEventListener('click', () => {
            const selectedThema = themaSelect.value;
            localStorage.setItem('thema', selectedThema);
            alert('テーマを保存しました');
        });
    }

    // 小説表示設定
    const novelFontFamily = document.getElementById('novel-font-family') as HTMLSelectElement | null;
    const novelFontSize = document.getElementById('novel-font-size') as HTMLSelectElement | null;
    const novelLineHeight = document.getElementById('novel-line-height') as HTMLSelectElement | null;
    const novelLetterSpacing = document.getElementById('novel-letter-spacing') as HTMLSelectElement | null;
    const saveNovelBtn = document.getElementById('save-novel-settings') as HTMLButtonElement | null;

    if (novelFontFamily) novelFontFamily.value = localStorage.getItem('novel-font-family') || 'serif';
    if (novelFontSize) novelFontSize.value = localStorage.getItem('novel-font-size') || 'medium';
    if (novelLineHeight) novelLineHeight.value = localStorage.getItem('novel-line-height') || 'normal';
    if (novelLetterSpacing) novelLetterSpacing.value = localStorage.getItem('novel-letter-spacing') || 'normal';

    saveNovelBtn?.addEventListener('click', () => {
        if (novelFontFamily) localStorage.setItem('novel-font-family', novelFontFamily.value);
        if (novelFontSize) localStorage.setItem('novel-font-size', novelFontSize.value);
        if (novelLineHeight) localStorage.setItem('novel-line-height', novelLineHeight.value);
        if (novelLetterSpacing) localStorage.setItem('novel-letter-spacing', novelLetterSpacing.value);
        alert('小説の表示設定を保存しました');
    });
});