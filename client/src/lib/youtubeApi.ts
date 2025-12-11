import { YouTubeVideo, YouTubeApiResponse } from '@/types/youtube';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Fetch videos from YouTube channel
 * Uses search endpoint for recent uploads
 */
export async function fetchYouTubeVideos(maxResults = 9): Promise<YouTubeVideo[]> {
  if (!API_KEY || !CHANNEL_ID) {
    console.error('YouTube API credentials missing');
    return [];
  }

  try {
    // Step 1: Search for videos
    const searchUrl = `${BASE_URL}/search?` + new URLSearchParams({
      key: API_KEY,
      channelId: CHANNEL_ID,
      part: 'snippet',
      order: 'date',
      type: 'video',
      maxResults: maxResults.toString(),
    });

    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      throw new Error(`YouTube API error: ${errorData.error?.message || searchResponse.statusText}`);
    }

    const searchData: YouTubeApiResponse = await searchResponse.json();
    
    if (!searchData.items?.length) {
      return [];
    }

    // Step 2: Get video details (duration, views)
    const videoIds = searchData.items
      .map(item => typeof item.id === 'string' ? item.id : item.id.videoId)
      .join(',');

    const detailsUrl = `${BASE_URL}/videos?` + new URLSearchParams({
      key: API_KEY,
      id: videoIds,
      part: 'contentDetails,statistics',
    });

    const detailsResponse = await fetch(detailsUrl);
    const detailsData: YouTubeApiResponse = await detailsResponse.json();

    // Step 3: Merge data
    return searchData.items.map((item, index) => {
      const videoId = typeof item.id === 'string' ? item.id : item.id.videoId;
      const details = detailsData.items[index];

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        publishedAt: item.snippet.publishedAt,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        duration: details?.contentDetails?.duration,
        viewCount: details?.statistics?.viewCount,
        channelTitle: item.snippet.channelTitle,
      };
    });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }
}

/**
 * Fetch videos from a specific playlist
 */
export async function fetchPlaylistVideos(playlistId: string, maxResults = 9): Promise<YouTubeVideo[]> {
  if (!API_KEY) {
    throw new Error('YouTube API key not configured');
  }

  const url = `${BASE_URL}/playlistItems?` + new URLSearchParams({
    key: API_KEY,
    playlistId,
    part: 'snippet',
    maxResults: maxResults.toString(),
  });

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch playlist: ${response.statusText}`);
  }

  const data: YouTubeApiResponse = await response.json();

  return data.items.map(item => ({
    id: typeof item.id === 'string' ? item.id : item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
    publishedAt: item.snippet.publishedAt,
    videoUrl: `https://www.youtube.com/watch?v=${typeof item.id === 'string' ? item.id : item.id.videoId}`,
    channelTitle: item.snippet.channelTitle,
  }));
}
