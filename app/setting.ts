type getCurrentTheme = () => Theme;

document.addEventListener('DOMContentLoaded', () => {
    const themaSelect = document.getElementById('thema') as HTMLSelectElement | null;
    const saveButton = document.getElementById('save-thema') as HTMLButtonElement | null;

    if (themaSelect && saveButton) {
        // 初期値をlocalStorageから取得して設定
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
});