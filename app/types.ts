/** 
 * Interface representing the structure of user top data.
 * This interface excludes any advertisement-related information.
*/
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
            meta: {
                title: string;
                description: string;
                canonical: string;
                ogp: {
                    description: string;
                    image: string;
                    title: string;
                    type: string;
                };
                twitter: {
                    description: string;
                    image: string;
                    title: string;
                    card: string;
                };
                alternateLanguages: {
                    ja: string;
                    en: string;
                };
                descriptionHeader: string;
            };
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
        tags: {
            tag: string;
            tag_translation: string;
        }[];
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
        ads: {
            ad_below_header: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: number;
                geta: boolean;
            };
            ad_below_everything: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: string;
                geta: boolean;
            };
            ad_below_everything_top: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: string;
                geta: boolean;
            };
            ad_above_related_works: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: string;
                geta: boolean;
            };
            ad_pager: {
                url: string;
                zone: string;
                ng: string;
                height: number;
                width: number;
                geta: boolean;
            };
            ad_overlay: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: number;
                geta: boolean;
            };
            ad_in_feed: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: string;
                geta: boolean;
            };
            ad_grid: {
                url: string;
                zone: string;
                ng: string;
                height: number;
                width: number;
                geta: boolean;
            };
            ad_list: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: string;
                geta: boolean;
            };
            ad_above_comment: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: string;
                geta: boolean;
            };
            logo: {
                url: string;
                zone: string;
                ng: string;
                height: number;
                width: number;
                geta: boolean;
            };
            ad_logo: {
                url: string;
                zone: string;
                ng: string;
                height: number;
                width: number;
                geta: boolean;
            };
        };
    };
}