import { Meta, ExternalSiteWorksStatus } from "./common";

/** https://www.pixiv.net/touch/ajax/user/details?id=:id */
export interface User {
    error: boolean;
    message: string;
    body: {
        user_details: {
            can_send_message: boolean;
            commission: null;
            cover_image: boolean;
            external_site_works_status: ExternalSiteWorksStatus;
            fanbox_details: {
                cover_image_url: string;
                creator_id: string;
                description: string;
                has_adult_content: string;
                registration_datetime: string;
                updated_datetime: string;
                url: string;
                user_id: string;
            };
            follows: number;
            has_bookmarks: boolean;
            has_collection_bookmarks: boolean;
            has_collections: boolean;
            has_follows: boolean;
            has_illust_bookmarks: boolean;
            has_illusts: boolean;
            has_mangas: boolean;
            has_mypixiv: boolean;
            has_novel_bookmarks: boolean;
            has_novels: boolean;
            is_blocked: boolean;
            is_blocking: boolean;
            is_followed: boolean;
            is_following: boolean;
            is_mypixiv: boolean;
            is_official: boolean;
            location: string;
            meta: Meta;
            prefecture: string;
            profile_img: { main: string; main_s: string };
            region: string;
            show_request_sent_tab: boolean;
            show_request_tab: boolean;
            social: { twitter: { url: string } };
            user_account: string;
            user_address: string;
            user_address_re: string;
            user_comment: string;
            user_comment_html: string;
            user_country: string;
            user_id: string;
            user_name: string;
            user_premium: string;
            user_sex: string;
            user_sex_re: string;
            user_sex_txt: string;
            user_status: string;
            user_webpage: string;
            user_year_re: string;
        };
    };
}

/** https://www.pixiv.net/ajax/user/:id/profile/top */
export interface UserTop {
    error: boolean;
    message: string;
    body: {
        illusts: {
            [key: string]: {
                aiType: number;
                alt: string;
                bookmarkData: null;
                createDate: string;
                description: string;
                height: number;
                id: string;
                illustType: number;
                isBookmarkable: boolean;
                isMasked: boolean;
                isUnlisted: boolean;
                pageCount: number;
                profileImageUrl: string;
                restrict: number;
                sl: number;
                tags: string[];
                title: string;
                titleCaptionTranslation: { workCaption: null; workTitle: null };
                updateDate: string;
                url: string;
                userId: string;
                userName: string;
                visibilityScope: number;
                width: number;
                xRestrict: number;
            };
        };
        manga: {
            [key: string]: {
                aiType: number;
                alt: string;
                bookmarkData: null;
                createDate: string;
                description: string;
                height: number;
                id: string;
                illustType: number;
                isBookmarkable: boolean;
                isMasked: boolean;
                isUnlisted: boolean;
                pageCount: number;
                profileImageUrl: string;
                restrict: number;
                sl: number;
                tags: string[];
                title: string;
                titleCaptionTranslation: { workCaption: null; workTitle: null };
                updateDate: string;
                url: string;
                userId: string;
                userName: string;
                visibilityScope: number;
                width: number;
                xRestrict: number;
            };
        };
        novels: unknown[];
        extraData: {
            meta: {
                alternateLanguages: { en: string; ja: string };
                canonical: string;
                description: string;
                descriptionHeader: string;
                ogp: { description: string; image: string; title: string; type: string };
                title: string;
                twitter: { card: string; description: string; image: string; title: string };
            };
        };
    };
}

/** https://www.pixiv.net/touch/ajax/user/illusts?id=:id&type=illust */
export interface UserIllusts {
    error: boolean;
    message: string;
    body: {
        illusts: {
            ai_type: number;
            alt: string;
            author_details: {
                user_account: string;
                user_id: string;
                user_name: string;
            };
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
            rating_count: string;
            rating_view: string;
            restrict: string;
            sl: number;
            tags: string[];
            title: string;
            title_caption_translation: { work_caption: null; work_title: null };
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
        }[];
        lastPage: number;
        meta: Meta;
        should_show_sensitive_notice: boolean;
        tags: { tag: string; tag_translation: string }[];
        total: number;
    };
}

/** https://www.pixiv.net/touch/ajax/illust/user_illusts?user_id=:id */
export interface UserIllustsUnder {
    error: boolean;
    message: string;
    body: {
        user_illust_ids: string[];
    };
}

/**
 * @login ログインが必要
 * https://www.pixiv.net/touch/ajax/user/home?id=:id
 */
export interface UserHome {
    error: boolean;
    message: string;
    body: {
        work_sets: {
            all: {
                name: string;
                data: {
                    url: string;
                    tags: string[];
                    title_caption_translation: {
                        work_title: null;
                        work_caption: null;
                    };
                    is_mypixiv: boolean;
                    is_private: boolean;
                    is_howto: boolean;
                    is_original: boolean;
                    alt: string;
                    url_s: string;
                    url_sm: string;
                    url_w: string;
                    url_ss: null;
                    url_big: null;
                    url_placeholder: null;
                    upload_timestamp: number;
                    location_mask: boolean;
                    id: string;
                    user_id: string;
                    title: string;
                    width: string;
                    height: string;
                    restrict: string;
                    x_restrict: string;
                    type: string;
                    sl: number;
                    book_style: string;
                    page_count: string;
                    comment_off_setting: number;
                    ai_type: number;
                    comment: string;
                    rating_count: string;
                    rating_view: string;
                    author_details: {
                        user_id: string;
                        user_name: string;
                        user_account: string;
                    };
                }[];
                type: string;
                total: number;
            };
            novels: {
                name: string;
                data: {
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
                    title_caption_translation: {
                        work_title: null;
                        work_caption: null;
                    };
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
                }[];
                type: string;
                total: number;
            };
        };
        pickups: {
            type: string;
            deletable: boolean;
            draggable: boolean;
            contentUrl: string;
            id: number;
            data: {
                url: null;
                tags: string[];
                type: string;
                id: string;
                title_caption_translation: {
                    work_title: null;
                    work_caption: null;
                };
                is_mypixiv: boolean;
                is_private: boolean;
                is_howto: boolean;
                is_original: boolean;
                alt: string;
                url_s: string;
                url_sm: string;
                url_w: string;
                url_ss: null;
                url_big: null;
                url_placeholder: null;
                work_type: string;
                location_mask: boolean;
                user_id: string;
                title: string;
                width: string;
                height: string;
                restrict: string;
                x_restrict: string;
                sl: number;
                book_style: string;
                page_count: string;
                comment_off_setting: number;
                ai_type: number;
                comment: string;
                author_details: {
                    user_id: string;
                    user_name: string;
                    user_account: string;
                };
            };
        }[];
        upload_complete_work: null;
        should_show_sensitive_notice: boolean;
        meta: Meta;
    };
}