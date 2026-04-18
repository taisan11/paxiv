document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-manga-viewer');
    const viewer = document.getElementById('manga-viewer');
    const closeBtn = document.getElementById('close-viewer');

    if (!openBtn || !viewer || !closeBtn) return;

    openBtn.addEventListener('click', () => {
        viewer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // 先頭ページへスクロールリセット
        const scroll = viewer.querySelector('.viewer-scroll') as HTMLElement | null;
        if (scroll) scroll.scrollLeft = 0;
    });

    closeBtn.addEventListener('click', closeViewer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeViewer();
    });

    // ビューア背景クリックで閉じる（スクロール部分以外）
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) closeViewer();
    });

    function closeViewer() {
        viewer!.style.display = 'none';
        document.body.style.overflow = '';
    }
});
