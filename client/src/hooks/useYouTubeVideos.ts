import { useQuery } from '@tanstack/react-query';
import { fetchYouTubeVideos } from '@/lib/youtubeApi';
import type { YouTubeVideo } from '@/types/youtube';

export function useYouTubeVideos(maxResults = 9) {
    return useQuery<YouTubeVideo[], Error>({
        queryKey: ['youtube-videos', maxResults],
        queryFn: () => fetchYouTubeVideos(maxResults),
        staleTime: 1000 * 60 * 30,        // 30 minutes
        gcTime: 1000 * 60 * 60 * 24,      // 24 hours (formerly cacheTime)
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2,
    });
}

