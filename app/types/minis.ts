export interface Illust {
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
}

export interface Manga {
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
}

export interface Novel {
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
}