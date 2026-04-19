import type { FC } from 'hono/jsx'

interface SearchTabBarProps {
    q: string
}

export const SearchTabBar: FC<SearchTabBarProps> = ({ q }) => {
    const encodedQ = encodeURIComponent(q)

    return (
        <nav className="search-tab-bar">
            <a href={`/search/i?q=${encodedQ}`}>イラスト</a>
            <a href={`/search/m?q=${encodedQ}`}>マンガ</a>
            <a href={`/search/n?q=${encodedQ}`}>ノベル</a>
        </nav>
    )
}
