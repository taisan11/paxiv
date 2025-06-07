export interface novel_details {
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
                    prev: {
                        id: string;
                        title: string;
                    };
                    next: {
                        id: string;
                        title: string;
                    };
                };
                latest_novel_ids: string[];
                zengo_novel_ids: string[];
            };
            series: {
                id: string;
                title: string;
                content_order: number;
                first_novel_id: string;
                is_concluded: boolean;
                is_watched: boolean;
                is_notifying: boolean;
                has_glossary: boolean;
                is_replaceable: boolean;
                next_novel: null;
                prev_novel: {
                    id: number;
                    viewable_type: number;
                    content_order: number;
                    title: string;
                };
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
            profile_img: {
                main: string;
            };
            profile_img_app_check_status: number;
            profile_img_mask_rule_set: {
                mask: number;
            };
            external_site_works_status: {
                booth: boolean;
                sketch: boolean;
                vroidHub: boolean;
            };
            accept_request: boolean;
            commission: null;
        };
        ads: {
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
                height: number;
                width: number;
                geta: boolean;
            };
            ad_below_novel_text: {
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
        promo: {
            novel: {
                general: {
                    work_id: number;
                    url: string;
                    name: string;
                    author: string;
                    image_url: string;
                    badge: string;
                    max_read_start_at: string;
                    description_as_text: string;
                    brief_description: string;
                    banner_r18_flag: boolean;
                    score: number;
                    date_badge_str: string;
                }[];
            };
        };
    };
}