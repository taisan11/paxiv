import { external_site_works_status, Meta, Tag, title_caption_translation, Unkown } from "./common";
import { Illust, Manga, Novel } from "./minis";

export interface Sarch {
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
            title_caption_translation: title_caption_translation;
            is_mypixiv: boolean;
            is_private: boolean;
            is_howto: boolean;
            is_original: boolean;
            alt: string;
            url_s: string;
            url_sm: string;
            url_w: string;
            url_ss: Unkown;
            url_big: Unkown;
            url_placeholder: Unkown;
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
            comment: Unkown;
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

export interface searchillust {
    error: boolean;
    message: string;
    body: {
        illusts: Illust[];
        total: number;
        lastPage: number;
        meta: {
            tag: string;
            words: string[];
            pixpedia: {
                tag: string;
                abstract: string;
                parent_tag: null;
                siblings_tags: null;
                children_tags: string[];
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
            translatedTag: null;
            relatedTags: {
                tag: string;
                cnt: number;
                tag_translation: string;
            }[];
            translatedTags: any[];
            popularIllusts: {
                illusts: {
                    illust_id: string;
                    illust_user_id: string;
                    illust_title: string;
                    illust_ext: string;
                    illust_width: string;
                    illust_height: string;
                    illust_restrict: string;
                    illust_x_restrict: string;
                    illust_create_date: string;
                    illust_upload_date: string;
                    illust_server_id: string;
                    illust_hash: null;
                    illust_type: string;
                    illust_sanity_level: number;
                    illust_ad_safety_level: string;
                    illust_book_style: string;
                    illust_page_count: string;
                    illust_comment_off_setting: string;
                    illust_ai_type: string;
                    illust_mask_apple_app_store: string;
                    illust_mask_google_play_store: string;
                    illust_custom_thumbnail_upload_datetime: null;
                    user_account: string;
                    user_name: string;
                    url: string;
                    illust_mask_rule_set: {
                        _illust_mask: number;
                    };
                }[];
                recent_illusts: {
                    [key:number]: {
                        illust_title: string;
                        illust_restrict: string;
                        illust_x_restrict: string;
                        illust_id: string;
                        illust_server_id: string;
                        illust_user_id: string;
                        illust_ext: string;
                        illust_upload_date: string;
                        illust_sanity_level: number;
                        illust_type: string;
                        illust_user_account: string;
                        upload_date: string;
                        reupload_date: number;
                    };
                };
                tag: string;
                create_date: string;
                search_count_all: number;
            };
            meta: Meta;
        };
    };
}
//https://www.pixiv.net/touch/ajax/search/illusts?include_meta=1&type=manga&s_mode=s_tag_full&word=%E6%9D%B1%E6%96%B9&csw=0&lang=ja&version=b3e58c7e8d45f9714abd74d528d8a1333e5d6a3a
export interface searchmanga {
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
            series: {
                id: string;
                user_id: string;
                title: string;
                caption: string;
                total: string;
                content_order: string;
                url: null;
                update_date: null;
                first_illust_id: null;
                latest_illust_id: null;
                latest_work: null;
                user: null;
                userId: string;
                coverImage: null;
                workCount: string;
                display_series_content_count: string;
                firstWorkId: null;
                is_watched: boolean;
                is_notifying: boolean;
            };
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
            author_details: {
                user_id: string;
                user_name: string;
                user_account: string;
            };
        }[];
        total: number;
        lastPage: number;
        meta: {
            tag: string;
            words: string[];
            pixpedia: {
                tag: string;
                abstract: string;
                parent_tag: null;
                siblings_tags: null;
                children_tags: string[];
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
            translatedTag: null;
            relatedTags: {
                tag: string;
                cnt: number;
                tag_translation: string;
            }[];
            translatedTags: any[];
            popularIllusts: {
                illusts: {
                    illust_id: string;
                    illust_user_id: string;
                    illust_title: string;
                    illust_ext: string;
                    illust_width: string;
                    illust_height: string;
                    illust_restrict: string;
                    illust_x_restrict: string;
                    illust_create_date: string;
                    illust_upload_date: string;
                    illust_server_id: string;
                    illust_hash: null;
                    illust_type: string;
                    illust_sanity_level: number;
                    illust_ad_safety_level: string;
                    illust_book_style: string;
                    illust_page_count: string;
                    illust_comment_off_setting: string;
                    illust_ai_type: string;
                    illust_mask_apple_app_store: string;
                    illust_mask_google_play_store: string;
                    illust_custom_thumbnail_upload_datetime: null;
                    user_account: string;
                    user_name: string;
                    url: string;
                    illust_mask_rule_set: {
                        _illust_mask: number;
                    };
                }[];
                recent_illusts: {
                    [key:number]: {
                        illust_title: string;
                        illust_restrict: string;
                        illust_x_restrict: string;
                        illust_id: string;
                        illust_server_id: string;
                        illust_user_id: string;
                        illust_ext: string;
                        illust_upload_date: string;
                        illust_sanity_level: number;
                        illust_type: string;
                        illust_user_account: string;
                        upload_date: string;
                        reupload_date: number;
                    };
                };
                tag: string;
                create_date: string;
                search_count_all: number;
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
    };
}

//https://www.pixiv.net/touch/ajax/search/novels?include_meta=1&word=%E6%9D%B1%E6%96%B9&csw=0&lang=ja&version=b3e58c7e8d45f9714abd74d528d8a1333e5d6a3a
export interface searchnovel {
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
                children_tags: string[];
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
                    [key:number]: {
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