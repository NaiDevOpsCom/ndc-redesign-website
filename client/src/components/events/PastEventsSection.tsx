import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { PastEventVideoCard } from './PastEventVideoCard';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import type { YouTubeVideo } from '@/types/youtube';

export function PastEventsSection() {
    const { data: videos, isLoading, error, refetch } = useYouTubeVideos(9);

    if (isLoading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Loading past event recordings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-500 mb-4">
                    Unable to load video recordings. Please try again later.
                </p>
                <Button variant="outline" onClick={() => refetch()}>
                    Retry
                </Button>
            </div>
        );
    }

    if (!videos || videos.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <p>No past event recordings available yet.</p>
                <p className="text-sm mt-2">Check back soon for recorded sessions!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video: YouTubeVideo) => (
                <PastEventVideoCard key={video.id} video={video} />
            ))}
        </div>
    );
}

