import type { FC } from 'hono/jsx'

interface PaginationProps {
    currentPage: number
    lastPage: number
    currentUrl: string
}

export const Pagination: FC<PaginationProps> = ({ currentPage, lastPage, currentUrl }) => {
    const params = new URLSearchParams(currentUrl.split('?')[1] || '')
    const prevParams = new URLSearchParams({ ...Object.fromEntries(params), p: (currentPage - 1).toString() })
    const nextParams = new URLSearchParams({ ...Object.fromEntries(params), p: (currentPage + 1).toString() })
    return (
        <div class="pagination">
            {currentPage !== 1 && <a href={`?${prevParams.toString()}`}>前に戻る</a>}
            {currentPage !== lastPage && <a href={`?${nextParams.toString()}`}>次に進む</a>}
        </div>
    )
}
