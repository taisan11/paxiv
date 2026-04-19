import type { FC } from 'hono/jsx'

interface SearchTabBarProps {
    q: string
}

export const SearchTabBar: FC<SearchTabBarProps> = ({ q }) => {
    return (
        <nav className="search-tab-bar">
            <a href={`/search/i?q=${q}`}>イラスト</a>
            <a href={`/search/m?q=${q}`}>マンガ</a>
            <a href={`/search/n?q=${q}`}>ノベル</a>
        </nav>
    )
}
