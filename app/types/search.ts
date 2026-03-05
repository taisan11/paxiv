import { Meta, Unkown } from "./common";
import { Illust, Manga } from "./illust";
import { Novel } from "./novel";

/** 人気イラスト (旧API形式) */
interface PopularIllust {
    illust_ad_safety_level: string;
    illust_ai_type: string;
    illust_book_style: string;
    illust_comment_off_setting: string;
    illust_create_date: string;
    illust_custom_thumbnail_upload_datetime: null;
    illust_ext: string;
    illust_hash: null;
    illust_height: string;
    illust_id: string;
    illust_mask_apple_app_store: string;
    illust_mask_google_play_store: string;
    illust_mask_rule_set: { _illust_mask: number };
    illust_page_count: string;
    illust_restrict: string;
    illust_sanity_level: number;
    illust_server_id: string;
    illust_title: string;
    illust_type: string;
    illust_upload_date: string;
    illust_user_id: string;
    illust_width: string;
    illust_x_restrict: string;
    url: string;
    user_account: string;
    user_name: string;
    user_status: string;
}

/** 検索メタ情報 (イラスト/マンガ) */
interface SearchIllustMeta {
    bookmarkRanges: {
        bgt: string | null;
        blt: number | string;
        count: null;
        current: boolean;
    }[];
    meta: {
        alternate_languages: { en: string; ja: string };
        canonical: string;
        description: string;
        description_header: string;
        title: string;
    };
    pixpedia: {
        abstract: string;
        breadcrumbs: string[];
        children_tags: string[];
        illust: { id: number; url: string };
        parent_tag: null;
        siblings_tags: null;
        tag: string;
    };
    popularIllusts: {
        create_date: string;
        illusts: PopularIllust[];
        recent_illusts: { [key: string]: {
            illust_ext: string;
            illust_id: string;
            illust_mask: number;
            illust_restrict: string;
            illust_sanity_level: number;
            illust_server_id: string;
            illust_title: string;
            illust_type: string;
            illust_upload_date: string;
            illust_user_account: string;
            illust_user_id: string;
            illust_user_status: string;
            illust_x_restrict: string;
            reupload_date: number;
            upload_date: string;
        } };
        search_count_all: number;
        tag: string;
    };
    relatedTags: { cnt: number; tag: string; tag_translation: string }[];
    tag: string;
    translatedTag: null;
    translatedTags: unknown[];
    words: string[];
}

/**
 * @login ログインが必要
 * https://www.pixiv.net/touch/ajax/tag_portal?word=:word
 */
export interface SearchAll {
    error: boolean;
    message: string;
    body: {
        meta: Meta;
        tag: string;
        translatedTag: Unkown;
        pixpedia: {
            tag: string;
            abstract: string;
            parent_tag: Unkown;
            siblings_tags: Unkown;
            children_tags: Unkown;
            breadcrumbs: string[];
            illust: { id: string; url: string };
        };
        relatedTags: { tag: string; tag_translation: string }[];
        translatedTags: unknown[];
        popularWorks: (Illust & { url: Unkown; url_ss: Unkown; url_big: Unkown; url_placeholder: Unkown; comment: Unkown })[];
        illusts: Illust[];
        illustsTotal: number;
        manga: Manga[];
        mangaTotal: number;
        novels: Novel[];
        novelsTotal: number;
    };
}

/** https://www.pixiv.net/touch/ajax/search/illusts?type=illust&word=:word */
export interface SearchIllust {
    error: boolean;
    message: string;
    body: {
        illusts: (Partial<Illust> & { is_ad_container?: number })[];
        lastPage: number;
        meta: SearchIllustMeta;
        total: number;
    };
}

/** https://www.pixiv.net/touch/ajax/search/illusts?type=manga&word=:word */
export interface SearchManga {
    error: boolean;
    message: string;
    body: {
        illusts: (Partial<Manga> & { is_ad_container?: number })[];
        lastPage: number;
        meta: SearchIllustMeta;
        total: number;
    };
}

/** https://www.pixiv.net/touch/ajax/search/novels?word=:word */
export interface SearchNovel {
    error: boolean;
    message: string;
    body: {
        lastPage: number;
        meta: {
            bookmarkRanges: {
                bgt: string | null;
                blt: number | string;
                count: null;
                current: boolean;
            }[];
            meta: {
                alternate_languages: { en: string; ja: string };
                canonical: string;
                description: string;
                description_header: string;
                title: string;
            };
            pixpedia: {
                abstract: string;
                breadcrumbs: string[];
                children_tags: string[];
                illust: { id: number; url: string };
                parent_tag: null;
                siblings_tags: null;
                tag: string;
            };
            popularNovels: {
                create_date: string;
                novels: {
                    ai_type: string;
                    cdate: string;
                    character_count: string;
                    comment: string;
                    comment_off_setting: string;
                    cover_id: string;
                    cover_type: string;
                    hash: string;
                    id: string;
                    img: string;
                    is_original: string;
                    language: string;
                    mask_rule_set: { mask: number };
                    mdate: string;
                    novel_cover_img_ext: string;
                    novel_cover_img_name: string;
                    response_auto: string;
                    restrict: string;
                    scene: string;
                    serialized_value: string;
                    tag: string;
                    tag_full_lock: string;
                    text: null;
                    text_length: number;
                    title: string;
                    tool: string;
                    type: string;
                    url: string;
                    user_account: string;
                    user_id: string;
                    user_name: string;
                    user_status: string;
                    word_count: string;
                    x_restrict: string;
                }[];
                recent_novels: { [key: string]: {
                    ai_type: string;
                    cdate: string;
                    character_count: string;
                    comment: string;
                    comment_off_setting: string;
                    cover_id: string;
                    cover_type: string;
                    hash: string;
                    id: string;
                    is_original: string;
                    language: string;
                    mask_rule_set: { mask: number };
                    mdate: string;
                    novel_cover_img_ext: string;
                    novel_cover_img_name: string;
                    response_auto: string;
                    restrict: string;
                    scene: string;
                    serialized_value: string;
                    tag: string;
                    tag_full_lock: string;
                    text: null;
                    text_length: number;
                    title: string;
                    tool: string;
                    type: string;
                    url: string;
                    user_account: string;
                    user_id: string;
                    user_name: string;
                    user_status: string;
                    word_count: string;
                    x_restrict: string;
                } };
                tag: string;
            };
            relatedTags: { cnt: number; tag: string; tag_translation: string }[];
            tag: string;
            translatedTags: unknown[];
            words: string[];
        };
        novels: (Partial<Novel> & { is_ad_container?: number })[];
        total: number;
    };
}