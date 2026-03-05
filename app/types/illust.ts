import { AuthorDetails, TitleCaptionTranslation } from "./common";

/** イラスト作品 (touch API) */
export interface Illust {
    ai_type: number;
    alt: string;
    author_details: AuthorDetails;
    book_style: string;
    comment: string | null;
    comment_off_setting: number;
    height: string;
    id: string;
    is_howto: boolean;
    is_mypixiv: boolean;
    is_original: boolean;
    is_private: boolean;
    location_mask: boolean;
    page_count: string;
    restrict: string;
    sl: number;
    tags: string[];
    title: string;
    title_caption_translation: TitleCaptionTranslation;
    type: string;
    upload_timestamp: number;
    url: string;
    url_big: string | null;
    url_placeholder: string | null;
    url_s: string;
    url_sm: string;
    url_ss: string | null;
    url_w: string;
    user_id: string;
    width: string;
    x_restrict: string;
}

/** マンガ作品 (シリーズ情報付きイラスト) */
export interface Manga extends Illust {
    comment: string;
    series?: {
        caption: string;
        content_order: string | null;
        coverImage: string | null;
        display_series_content_count: string;
        first_illust_id: string | null;
        firstWorkId: string | null;
        id: string;
        is_notifying: boolean;
        is_watched: boolean;
        latest_illust_id: string | null;
        latest_work: null;
        title: string;
        total: string;
        update_date: string | null;
        url: string | null;
        user: null;
        user_id: string;
        userId: string;
        workCount: string;
    };
}

/** https://www.pixiv.net/touch/ajax/illust/details?illust_id=:id */
export interface IllustDetails {
    error: boolean;
    message: string;
    body: {
        illust_details: {
            ai_type: number;
            alt: string;
            author_details: AuthorDetails;
            book_style: string;
            bookmark_user_total: number;
            comment: string;
            comment_html: string;
            comment_off_setting: number;
            display_tags: {
                is_deletable: boolean;
                is_locked: boolean;
                is_pixpedia_article_exists: boolean;
                set_by_author: boolean;
                tag: string;
            }[];
            height: string;
            id: string;
            illust_images: {
                illust_image_height: string;
                illust_image_width: string;
            }[];
            /** マンガ作品のページリスト */
            manga_a?: {
                page: number;
                url: string;
                url_big: string;
                url_small: string;
            }[] | null;
            is_howto: boolean;
            is_login_only: boolean;
            is_mypixiv: boolean;
            is_original: boolean;
            is_private: boolean;
            location_mask: boolean;
            meta: {
                alternate_languages: { en: string; ja: string };
                canonical: string;
                description: string;
                description_header: string;
                ogp: { description: string; image: string; title: string; type: string };
                title: string;
                twitter_card: { [key: string]: string };
            };
            meta_for_nologin: {
                breadcrumbs: string[];
                breadcrumbs_translations: null;
                pixpedia: { abstract: string; tag: string; url: string }[];
                zengo_id_works: {
                    next: { id: string; title: string };
                    prev: { id: string; title: string };
                };
                zengo_illusts: string[];
            };
            page_count: string;
            rating_count: string;
            rating_view: string;
            request: null;
            restrict: string;
            share_text: string;
            sl: number;
            tags: string[];
            title: string;
            title_caption_translation: TitleCaptionTranslation;
            type: string;
            ugoira_meta: null;
            upload_timestamp: number;
            url: string;
            url_big: string;
            url_placeholder: string;
            url_s: string;
            url_ss: string;
            user_id: string;
            width: string;
            x_restrict: string;
        };
        author_details: {
            commission: null;
            external_site_works_status: {
                booth: boolean;
                sketch: boolean;
                vroidHub: boolean;
            };
            profile_img: { main: string };
            profile_img_app_check_status: number;
            profile_img_mask_rule_set: { mask: number };
            user_account: string;
            user_id: string;
            user_name: string;
            user_premium: string;
            user_status: string;
        };
    };
}
