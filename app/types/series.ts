/** https://www.pixiv.net/touch/ajax/illust/series/:id */
export interface IllustSeriesDetail {
    error: boolean;
    message: string;
    body: {
        series: {
            caption: string;
            coverImage: string;
            coverImageSl: number;
            display_series_content_count: number;
            firstWorkId: string;
            id: string;
            isSetCover: boolean;
            share_text: string;
            title: string;
            total: string;
            userId: string;
            workCount: string;
        };
        isNotifying: boolean;
        isWatched: boolean;
    };
}

/** https://www.pixiv.net/touch/ajax/illust/series_content/:id?limit=10&last_order=0 */
export interface IllustSeriesContent {
    error: boolean;
    message: string;
    body: {
        series_contents: {
            ai_type: number;
            alt: string;
            author_details: {
                user_account: string;
                user_id: string;
                user_name: string;
            };
            book_style: string;
            comment: string;
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
            series: {
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
            visible: boolean;
            width: string;
            x_restrict: string;
        }[];
    };
}

/** https://www.pixiv.net/touch/ajax/user/series?id=:id */
export interface UserSeries {
    error: boolean;
    message: string;
    body: {
        series: {
            manga: {
                caption: string;
                content_order: string | null;
                coverImage: string;
                display_series_content_count: string;
                first_illust_id: string;
                firstWorkId: string;
                id: string;
                is_notifying: boolean;
                is_watched: boolean;
                latest_illust_id: string | null;
                latest_work: null;
                title: string;
                total: string;
                update_date: string;
                url: string;
                user: {
                    profile_img: { main: string; main_s: string };
                    profile_img_app_check_status: number;
                    profile_img_mask_rule_set: { mask: number };
                    user_account: string;
                    user_id: string;
                    user_name: string;
                    user_premium: string;
                    user_status: string;
                };
                user_id: string;
                userId: string;
                workCount: string;
            }[];
            novels: {
                aiType: number;
                bookmarkCount: number;
                caption: string;
                cover: {
                    urls: {
                        "1200x1200": string;
                        "128x128": string;
                        "240mw": string;
                        "480mw": string;
                        original: string;
                    };
                };
                createDateTime: string;
                episodeCount: number;
                genre: string;
                id: string;
                isConcluded: boolean;
                isNotifying: boolean;
                isOneshot: boolean;
                isOriginal: boolean;
                isWatched: boolean;
                latestEpisodeId: string;
                latestPublishDateTime: string;
                profileImageUrl: string;
                publishedEpisodeCount: number;
                publishedReadingTime: number;
                publishedTextLength: number;
                publishedWordCount: number;
                readingTime: number;
                restrict: number;
                tags: string[];
                textLength: number;
                title: string;
                titleCaptionTranslation: null;
                updateDateTime: string;
                userId: string;
                userName: string;
                useWordCount: boolean;
                wordCount: number;
                xRestrict: number;
            }[];
        };
    };
}