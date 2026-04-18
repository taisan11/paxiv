import type { FC } from 'hono/jsx'

interface PaginationProps {
    currentPage: number
    lastPage: number
    currentUrl: string
}

export const Pagination: FC<PaginationProps> = ({ currentPage, lastPage, currentUrl }) => {
    if (lastPage <= 1) return null

    const safeCurrentPage = Math.max(1, Math.min(currentPage, lastPage))
    const params = new URLSearchParams(currentUrl.split('?')[1] || '')
    const prevParams = new URLSearchParams({ ...Object.fromEntries(params), p: (safeCurrentPage - 1).toString() })
    const nextParams = new URLSearchParams({ ...Object.fromEntries(params), p: (safeCurrentPage + 1).toString() })
    return (
        <div class="pagination">
            {safeCurrentPage !== 1 && <a href={`?${prevParams.toString()}`}>前に戻る</a>}
            {safeCurrentPage !== lastPage && <a href={`?${nextParams.toString()}`}>次に進む</a>}
        </div>
    )
}
