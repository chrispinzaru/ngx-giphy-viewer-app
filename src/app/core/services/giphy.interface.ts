export interface BaseResponse {
    pagination?: Pagination;
    meta?: {
        status: number;
        msg: string;
        response_id: string;
    };
}

export interface Pagination {
    count: number;
    total_count: number;
    offset: number;
}

export interface SearchResponse extends BaseResponse {
    data: Gif[];
}

export interface Gif {
    id: string;
    type: string;
    url: string;
    title: string;
    images: RenditionImages;
}

interface BaseImage {
    url: string;
    width: string;
    height: string;
}

interface RenditionImages {
    downsized: BaseImage & {
        size: string;
    };
}
