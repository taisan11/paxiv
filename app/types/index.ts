/** 
 * Interface representing the structure of user top data.
 * This interface excludes any advertisement-related information.
*/

//include_metaでmetaを取得するかどうか(検索用)
//0:取得しない 1:取得する

import { Meta, Tag } from "./common";
import { Illust, Manga, Novel } from "./minis";

//https://www.pixiv.net/touch/ajax/user/details?id=${userId}
export interface User {
    error: boolean;
    message: string;
    body: {
        user_details: {
            user_id: string;
            user_status: string;
            user_account: string;
            user_name: string;
            user_premium: string;
            user_webpage: string;
            user_country: string;
            user_address: string;
            user_address_re: string;
            user_year_re: string;
            user_sex: string;
            user_sex_re: string;
            user_comment: string;
            profile_img: {
                main: string;
                main_s: string;
            };
            location: string;
            region: string;
            prefecture: string;
            user_sex_txt: string;
            is_followed: boolean;
            is_following: boolean;
            is_mypixiv: boolean;
            is_blocking: boolean;
            is_blocked: boolean;
            commission: null;
            is_official: boolean;
            follows: number;
            social: {
                twitter: {
                    url: string;
                };
            };
            user_comment_html: string;
            cover_image: boolean;
            has_illusts: boolean;
            has_mangas: boolean;
            has_novels: boolean;
            has_bookmarks: boolean;
            has_illust_bookmarks: boolean;
            has_novel_bookmarks: boolean;
            external_site_works_status: {
                booth: boolean;
                sketch: boolean;
                vroidHub: boolean;
            };
            has_follows: boolean;
            has_mypixiv: boolean;
            fanbox_details: {
                user_id: string;
                creator_id: string;
                description: string;
                has_adult_content: string;
                registration_datetime: string;
                updated_datetime: string;
                cover_image_url: string;
                url: string;
            };
            show_request_tab: boolean;
            show_request_sent_tab: boolean;
            can_send_message: boolean;
            meta: Meta
        };
    };
}
/**
 * @url https://www.pixiv.net/ajax/user/:userid/profile/top
 */
export interface UserTop {
    error: boolean;
    message: string;
    body: {
        illusts: {
            [key: number]: {
                id: string;
                title: string;
                illustType: number;
                xRestrict: number;
                restrict: number;
                sl: number;
                url: string;
                description: string;
                tags: string[];
                userId: string;
                userName: string;
                width: number;
                height: number;
                pageCount: number;
                isBookmarkable: boolean;
                bookmarkData: null;
                alt: string;
                titleCaptionTranslation: {
                    workTitle: null;
                    workCaption: null;
                };
                createDate: string;
                updateDate: string;
                isUnlisted: boolean;
                isMasked: boolean;
                aiType: number;
                visibilityScope: number;
                profileImageUrl: string;
            };
        };
        manga:{
            [id: number]: {
                id: string;
                title: string;
                illustType: number;
                xRestrict: number;
                restrict: number;
                sl: number;
                url: string;
                description: string;
                tags: string[];
                userId: string;
                userName: string;
                width: number;
                height: number;
                pageCount: number;
                isBookmarkable: boolean;
                bookmarkData: null;
                alt: string;
                titleCaptionTranslation: {
                    workTitle: null;
                    workCaption: null;
                };
                createDate: string;
                updateDate: string;
                isUnlisted: boolean;
                isMasked: boolean;
                aiType: number;
                visibilityScope: number;
                profileImageUrl: string;
            }
        }
        extraData: {
            meta: Meta
        };
    }
}
//https://www.pixiv.net/touch/ajax/user/illusts?id=4357166&type=illust
export interface UserIllusts {
    error: boolean;
    message: string;
    body: {
        illusts: {
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
        tags: Tag[]
        total: number;
        lastPage: number;
        should_show_sensitive_notice: boolean;
        meta: {
            twitter_card: {
                card: string;
                site: string;
                title: string;
                image: string;
                description: string;
            };
            ogp: {
                title: string;
                type: string;
                image: string;
                description: string;
            };
            title: string;
            description: string;
            description_header: string;
            canonical: string;
            alternate_languages: {
                ja: string;
                en: string;
            };
        };
    };
}

//https://www.pixiv.net/touch/ajax/illust/details?illust_id=101929897
export interface illustdetails {
    error: boolean;
    message: string;
    body: {
        illust_details: {
            url: string;
            tags: string[];
            illust_images: {
                illust_image_width: string;
                illust_image_height: string;
            }[];
            display_tags: {
                tag: string;
                is_pixpedia_article_exists: boolean;
                set_by_author: boolean;
                is_locked: boolean;
                is_deletable: boolean;
            }[];
            bookmark_user_total: number;
            url_s: string;
            url_ss: string;
            url_big: string;
            url_placeholder: string;
            ugoira_meta: null;
            share_text: string;
            request: null;
            location_mask: boolean;
            is_login_only: boolean;
            meta: Meta;
            meta_for_nologin: {
                breadcrumbs: string[];
                breadcrumbs_translations: null;
                zengo_illusts: string[];
                zengo_id_works: {
                    prev: {
                        id: string;
                        title: string;
                    };
                    next: {
                        id: string;
                        title: string;
                    };
                };
                pixpedia: {
                    tag: string;
                    abstract: string;
                    url: string;
                }[];
            };
            title_caption_translation: {
                work_title: null;
                work_caption: null;
            };
            is_mypixiv: boolean;
            is_private: boolean;
            is_howto: boolean;
            is_original: boolean;
            alt: string;
            upload_timestamp: number;
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
            comment_html: string;
            author_details: {
                user_id: string;
                user_name: string;
                user_account: string;
            };
        };
        author_details: {
            user_id: string;
            user_status: string;
            user_account: string;
            user_name: string;
            user_premium: string;
            profile_img: {
                main: string;
            };
            external_site_works_status: {
                booth: boolean;
                sketch: boolean;
                vroidHub: boolean;
            };
            commission: null;
        };
    };
}

export interface Sarch {
    error: boolean;
    message: string;
    body: {
        meta: Meta;
        tag: string;
        translatedTag: null;
        pixpedia: {
            tag: string;
            abstract: string;
            parent_tag: null;
            siblings_tags: null;
            children_tags: null;
            breadcrumbs: string[];
            illust: {
                id: string;
                url: string;
            };
        };
        relatedTags: {
            tag: string;
            tag_translation: string;
        }[];
        translatedTags: any[];
        popularWorks: {
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
            comment: null;
            author_details: {
                user_id: string;
                user_name: string;
                user_account: string;
            };
        }[];
        illusts: Illust[];
        illustsTotal: number;
        manga: Manga[];
        mangaTotal: number;
        novels: Novel[];
        novelsTotal: number;
    }
};

interface GeneratedType {
    error: boolean;
    message: string;
    body: {
        meta: {
            tag: string;
            words: string[];
            pixpedia: {
                tag: string;
                abstract: string;
                parent_tag: null;
                siblings_tags: null;
                children_tags: null;
                breadcrumbs: string[];
                illust: {
                    id: number;
                    url: string;
                };
            };
            bookmarkRanges: {
                blt: string;
                bgt: null;
                count: null;
                current: boolean;
            }[];
            relatedTags: {
                tag: string;
                cnt: number;
                tag_translation: string;
            }[];
            translatedTags: any[];
            popularNovels: {
                tag: string;
                novels: {
                    id: string;
                    title: string;
                    comment: string;
                    user_id: string;
                    scene: string;
                    restrict: string;
                    x_restrict: string;
                    tag_full_lock: string;
                    response_auto: string;
                    is_original: string;
                    language: string;
                    tag: string;
                    tool: string;
                    cover_type: string;
                    cover_id: string;
                    hash: string;
                    serialized_value: string;
                    character_count: string;
                    word_count: string;
                    cdate: string;
                    mdate: string;
                    novel_cover_img_name: string;
                    novel_cover_img_ext: string;
                    comment_off_setting: string;
                    ai_type: string;
                    type: string;
                    text: null;
                    mask_rule_set: {
                        mask: number;
                    };
                    text_length: number;
                    user_account: string;
                    user_name: string;
                    user_status: string;
                    url: string;
                    img: string;
                }[];
                recent_novels: {
                    24312665: {
                        id: string;
                        title: string;
                        comment: string;
                        user_id: string;
                        scene: string;
                        restrict: string;
                        x_restrict: string;
                        tag_full_lock: string;
                        response_auto: string;
                        is_original: string;
                        language: string;
                        tag: string;
                        tool: string;
                        cover_type: string;
                        cover_id: string;
                        hash: string;
                        serialized_value: string;
                        character_count: string;
                        word_count: string;
                        cdate: string;
                        mdate: string;
                        novel_cover_img_name: string;
                        novel_cover_img_ext: string;
                        comment_off_setting: string;
                        ai_type: string;
                        type: string;
                        text: null;
                        mask_rule_set: {
                            mask: number;
                        };
                        text_length: number;
                        user_account: string;
                        user_name: string;
                        user_status: string;
                        url: string;
                    };
                    24315954: {
                        id: string;
                        title: string;
                        comment: string;
                        user_id: string;
                        scene: string;
                        restrict: string;
                        x_restrict: string;
                        tag_full_lock: string;
                        response_auto: string;
                        is_original: string;
                        language: string;
                        tag: string;
                        tool: string;
                        cover_type: string;
                        cover_id: string;
                        hash: string;
                        serialized_value: string;
                        character_count: string;
                        word_count: string;
                        cdate: string;
                        mdate: string;
                        novel_cover_img_name: string;
                        novel_cover_img_ext: string;
                        comment_off_setting: string;
                        ai_type: string;
                        type: string;
                        text: null;
                        mask_rule_set: {
                            mask: number;
                        };
                        text_length: number;
                        user_account: string;
                        user_name: string;
                        user_status: string;
                        url: string;
                    };
                    24357147: {
                        id: string;
                        title: string;
                        comment: string;
                        user_id: string;
                        scene: string;
                        restrict: string;
                        x_restrict: string;
                        tag_full_lock: string;
                        response_auto: string;
                        is_original: string;
                        language: string;
                        tag: string;
                        tool: string;
                        cover_type: string;
                        cover_id: string;
                        hash: string;
                        serialized_value: string;
                        character_count: string;
                        word_count: string;
                        cdate: string;
                        mdate: string;
                        novel_cover_img_name: string;
                        novel_cover_img_ext: string;
                        comment_off_setting: string;
                        ai_type: string;
                        type: string;
                        text: null;
                        mask_rule_set: {
                            mask: number;
                        };
                        text_length: number;
                        user_account: string;
                        user_name: string;
                        user_status: string;
                        url: string;
                    };
                };
                create_date: string;
            };
            meta: {
                title: string;
                canonical: string;
                description: string;
                description_header: string;
                alternate_languages: {
                    ja: string;
                    en: string;
                };
            };
        };
        novels: {
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
            series: {
                id: string;
                title: string;
                content_order: number;
                first_novel_id: string;
                is_concluded: boolean;
                is_watched: boolean;
                is_notifying: boolean;
            };
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
        total: number;
        lastPage: number;
    };
}