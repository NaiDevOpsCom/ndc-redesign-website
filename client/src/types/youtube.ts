export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
    videoUrl: string;
    duration?: string;
    viewCount?: string;
    channelTitle?: string;
}

export interface YouTubeApiResponse {
    items: YouTubeApiItem[];
    nextPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}

interface YouTubeApiItem {
    id: {
        videoId: string;
    } | string;
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            high: { url: string };
            medium: { url: string };
            default: { url: string };
        };
        publishedAt: string;
        channelTitle: string;
    };
    contentDetails?: {
        duration: string;
    };
    statistics?: {
        viewCount: string;
    };
}
