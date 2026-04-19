import type { FC } from "hono/jsx"

interface ThumbnailCardProps {
    href: string
    imageSrc: string
    title: string
    xRestrict?: number
    pageCount?: number
}

export const ThumbnailCard: FC<ThumbnailCardProps> = ({ href, imageSrc, title, xRestrict = 0, pageCount = 1 }) => {
    const r18Label = xRestrict >= 2 ? "R-18G" : xRestrict >= 1 ? "R-18" : null
    const hasMultiPage = pageCount > 1

    return (
        <a href={href} class="list-base-item">
            <div class="list-base-thumb-wrap">
                <img loading="lazy" src={imageSrc} alt={title} class="list-base-img" />
                {r18Label && <span class="thumb-badge thumb-badge-r18">{r18Label}</span>}
                {hasMultiPage && <span class="thumb-badge thumb-badge-pages">📚 {pageCount}</span>}
            </div>
        </a>
    )
}
