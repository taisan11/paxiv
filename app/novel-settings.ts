type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
type LineHeight = 'compact' | 'normal' | 'wide';
type LetterSpacing = 'normal' | 'wide' | 'wider';

const FONT_SIZE_MAP: Record<FontSize, string> = {
    small: '14px',
    medium: '16px',
    large: '18px',
    xlarge: '22px',
};

const LINE_HEIGHT_MAP: Record<LineHeight, string> = {
    compact: '1.6',
    normal: '2.0',
    wide: '2.5',
};

const LETTER_SPACING_MAP: Record<LetterSpacing, string> = {
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
};

function applyNovelSettings(): void {
    const el = document.getElementById('novel-text') as HTMLElement | null;
    if (!el) return;

    const fontFamily = localStorage.getItem('novel-font-family') || 'serif';
    const fontSize = (localStorage.getItem('novel-font-size') || 'medium') as FontSize;
    const lineHeight = (localStorage.getItem('novel-line-height') || 'normal') as LineHeight;
    const letterSpacing = (localStorage.getItem('novel-letter-spacing') || 'normal') as LetterSpacing;

    el.style.fontFamily = fontFamily;
    el.style.fontSize = FONT_SIZE_MAP[fontSize] ?? '16px';
    el.style.lineHeight = LINE_HEIGHT_MAP[lineHeight] ?? '2.0';
    el.style.letterSpacing = LETTER_SPACING_MAP[letterSpacing] ?? '0';
}

document.addEventListener('DOMContentLoaded', applyNovelSettings);
