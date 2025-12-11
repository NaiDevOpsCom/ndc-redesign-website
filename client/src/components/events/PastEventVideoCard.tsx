import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { YouTubeVideo } from '@/types/youtube';

interface PastEventVideoCardProps {
    video: YouTubeVideo;
}

export function PastEventVideoCard({ video }: PastEventVideoCardProps) {
    const [showPlayer, setShowPlayer] = useState(false);

    const formatViewCount = (count?: string) => {
        if (!count) return '';
        const num = parseInt(count);
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    // Extract video ID from URL
    const getVideoId = (url: string) => {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
        return match ? match[1] : null;
    };

    const videoId = getVideoId(video.videoUrl);

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
                {showPlayer && videoId ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                ) : (
                    <>
                        <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <button
                            onClick={() => setShowPlayer(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                            aria-label={`Play ${video.title}`}
                        >
                            <div className="bg-primary rounded-full p-4 group-hover:scale-110 transition-transform">
                                <Play className="h-8 w-8 text-white fill-white" />
                            </div>
                        </button>
                    </>
                )}
            </div>

            <CardContent className="p-4 sm:p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge variant="secondary" className="text-xs">Past Event</Badge>
                    {video.viewCount && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            <span>{formatViewCount(video.viewCount)} views</span>
                        </div>
                    )}
                </div>

                <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2 text-left">
                    {video.title}
                </h3>

                {video.publishedAt && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(video.publishedAt), 'MMMM d, yyyy')}</span>
                    </div>
                )}

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-4 text-left flex-grow">
                    {video.description}
                </p>

                <Button
                    variant="outline"
                    className="w-full mt-auto"
                    onClick={() => window.open(video.videoUrl, '_blank', 'noopener,noreferrer')}
                >
                    Watch on YouTube
                </Button>
            </CardContent>
        </Card>
    );
}

