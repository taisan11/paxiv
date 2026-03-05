import { Meta, TitleCaptionTranslation } from "./common";

/** 小説作品 (touch API) */
export interface Novel {
    ai_type: number;
    author_details: {
        user_account: string;
        user_id: string;
        user_name: string;
    };
    bookmark_count: number;
    character_count: string;
    comment: string;
    comment_html: string;
    comment_off_setting: number;
    cover_image: {
        urls: {
            "128x128": string;
            "240mw": string;
            "480mw": string;
            original: string;
        };
    };
    genre: string;
    id: string;
    is_howto: boolean;
    is_mypixiv: boolean;
    is_original: boolean;
    is_private: boolean;
    language: string;
    marker_count: number;
    profile_image_url: string;
    rating_count: number;
    rating_view: number;
    reading_time: number;
    restrict: string;
    reupload_timestamp: number;
    scene: string;
    series?: {
        content_order: number;
        first_novel_id: string;
        id: string;
        is_concluded: boolean;
        is_notifying: boolean;
        is_watched: boolean;
        title: string;
    };
    tags: string[];
    text_length: number;
    title: string;
    title_caption_translation: TitleCaptionTranslation;
    upload_timestamp: number;
    url: string;
    url_big: string;
    url_s: string;
    use_word_count: boolean;
    user_id: string;
    user_name: string;
    word_count: number;
    work_type: string;
    x_restrict: string;
}

/**
 * @login ログインが必要
 * https://www.pixiv.net/touch/ajax/novel/details?novel_id=:id
 */
export interface NovelDetails {
    error: boolean;
    message: string;
    body: {
        novel_details: {
            id: string;
            title: string;
            comment: string;
            user_id: string;
            scene: string;
            restrict: string;
            x_restrict: string;
            is_original: boolean;
            language: string;
            character_count: string;
            word_count: number;
            comment_off_setting: number;
            ai_type: number;
            text_length: number;
            user_name: string;
            url: string;
            genre: string;
            marker_count: number;
            bookmark_count: number;
            rating_count: number;
            rating_view: number;
            tags_editable: boolean;
            display_tags: {
                tag: string;
                is_locked: boolean;
                set_by_author: boolean;
                is_deletable: boolean;
            }[];
            share_text: string;
            request: null;
            meta: {
                twitter_card: {
                    card: string;
                    site: string;
                    url: string;
                    title: string;
                    description: string;
                    image: string;
                };
                ogp: {
                    title: string;
                    type: string;
                    description: string;
                    image: string;
                };
                title: string;
                description: string;
                description_header: string;
                canonical: string;
            };
            is_login_only: boolean;
            meta_for_nologin: {
                breadcrumbs: string[];
                breadcrumbs_translations: null;
                zengo_id_works: {
                    prev: { id: string; title: string } | null;
                    next: { id: string; title: string } | null;
                };
                latest_novel_ids: string[];
                zengo_novel_ids: string[];
            };
            series?: {
                id: string;
                title: string;
                content_order: number;
                first_novel_id: string;
                is_concluded: boolean;
                is_watched: boolean;
                is_notifying: boolean;
                has_glossary: boolean;
                is_replaceable: boolean;
                next_novel: {
                    id: number;
                    viewable_type: number;
                    content_order: number;
                    title: string;
                } | null;
                prev_novel: {
                    id: number;
                    viewable_type: number;
                    content_order: number;
                    title: string;
                } | null;
            } | null;
            title_caption_translation: { work_title: null; work_caption: null };
            cover_image: {
                urls: {
                    "240mw": string;
                    "480mw": string;
                    "128x128": string;
                    original: string;
                };
            };
            is_mypixiv: boolean;
            is_private: boolean;
            is_howto: boolean;
            use_word_count: boolean;
            reading_time: number;
            url_s: string;
            url_big: string;
            upload_timestamp: number;
            reupload_timestamp: number;
            profile_image_url: string;
            work_type: string;
            tags: string[];
            comment_html: string;
            author_details: {
                user_id: string;
                user_name: string;
                user_account: string;
            };
            text: string;
            marker: null;
            suggestedConfig: {
                viewMode: string;
                themeBackground: string;
                themeSize: null;
                themeSpacing: null;
            };
        };
        author_details: {
            user_id: string;
            user_status: string;
            user_account: string;
            user_name: string;
            user_premium: string;
            profile_img: { main: string };
            profile_img_app_check_status: number;
            profile_img_mask_rule_set: { mask: number };
            external_site_works_status: {
                booth: boolean;
                sketch: boolean;
                vroidHub: boolean;
            };
            accept_request: boolean;
            commission: null;
        };
    };
}

/** https://www.pixiv.net/touch/ajax/user/novels?id=:id */
export interface UserNovels {
    error: boolean;
    message: string;
    body: {
        lastPage: number;
        meta: Meta;
        novels: Novel[];
        tags: { tag: string; tag_translation: string }[];
        total: number;
    };
}