//https://www.pixiv.net/touch/ajax/illust/series/:id
export interface seriesdetail {
    error: boolean;
    body: {
        series: {
            id: string;
            title: string;
            caption: string;
            isSetCover: boolean;
            coverImage: boolean;
            userId: string;
            workCount: string;
            share_text: string;
            firstWorkId: string;
            display_series_content_count: number;
            total: string;
            coverImageSl: string | null;
        };
        isWatched: boolean;
        isNotifying: boolean;
    };
    message: string;
}
// limit=最大数,last_order=11個からとかする
//https://www.pixiv.net/touch/ajax/illust/series_content/:id?limit=10&last_order=0
export interface series_content {
    error: boolean;
    body: {
        series_contents: {
            url: string;
            tags: string[];
            visible: boolean;
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
    message: string;
}