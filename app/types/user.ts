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
        ads: {
            ad_below_header: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: number;
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
            ad_below_everything: {
                url: string;
                zone: string;
                ng: string;
                height: string;
                width: string;
                geta: boolean;
            };
            t_responsive_320_50: {
                url: string;
                zone: string;
                ng: string;
                height: number;
                width: number;
                geta: boolean;
            };
            t_responsive_300_250: {
                url: string;
                zone: string;
                ng: string;
                height: number;
                width: number;
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