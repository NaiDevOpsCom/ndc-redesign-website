# 🎥 YouTube Integration Implementation Guide

## 📋 Overview

This guide provides step-by-step instructions for setting up YouTube video integration to display past event recordings on your website.

---

## 🏗️ Architecture

### Technology Stack
- **YouTube Data API v3** - Official Google API for fetching video data
- **TanStack React Query** - Data fetching, caching, and state management
- **react-player** - Optimized YouTube video embedding
- **TypeScript** - Type-safe API interactions

### Key Components Created
```
client/src/
├── types/
│   └── youtube.ts                          # TypeScript interfaces
├── lib/
│   └── youtubeApi.ts                       # API service layer
├── hooks/
│   └── useYouTubeVideos.ts                 # React Query hook
└── components/events/
    ├── PastEventVideoCard.tsx              # Individual video card
    └── PastEventsSection.tsx               # Video grid section
```

---

## 🔧 Setup Instructions

### Step 1: Get YouTube API Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project** (or select existing)
   - Click "Select a project" → "New Project"
   - Name: "NDC Website" or similar
   - Click "Create"

3. **Enable YouTube Data API v3**
   - Go to "APIs & Services" → "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"

4. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key

5. **Restrict API Key (Security)**
   - Click on the API key to edit
   - Under "Application restrictions":
     - Select "HTTP referrers (websites)"
     - Add: `https://your-domain.com/*`
     - Add: `http://localhost:5173/*` (for development)
   - Under "API restrictions":
     - Select "Restrict key"
     - Choose "YouTube Data API v3"
   - Click "Save"

### Step 2: Get Your YouTube Channel ID

**Method 1: From YouTube Studio**
1. Go to YouTube Studio: https://studio.youtube.com
2. Click "Settings" → "Channel" → "Advanced settings"
3. Copy your "Channel ID"

**Method 2: From Channel URL**
1. Go to your channel page
2. Look at the URL: `youtube.com/channel/YOUR_CHANNEL_ID`
3. Copy the ID after `/channel/`

**Method 3: Using YouTube API**
```bash
# Replace YOUR_API_KEY with your actual API key
curl "https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=YOUR_USERNAME&key=YOUR_API_KEY"
```

### Step 3: Configure Environment Variables

1. **Create `.env` file** in project root:
```bash
# Copy from example
cp .env.example .env
```

2. **Edit `.env` file**:
```env
VITE_YOUTUBE_API_KEY=AIzaSyC...your_actual_key
VITE_YOUTUBE_CHANNEL_ID=UCx...your_channel_id
```

3. **Add `.env` to `.gitignore`** (if not already):
```bash
echo ".env" >> .gitignore
```

### Step 4: Verify Installation

1. **Install dependencies** (if not already):
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Test the integration**:
   - Navigate to `http://localhost:5173`
   - Scroll to "Past Events" section
   - You should see YouTube videos loading

---

## 🎯 API Usage & Quota Management

### YouTube API Quota Limits

**Default quota: 10,000 units/day**

**Query costs:**
- `search.list` = 100 units
- `videos.list` = 1 unit

**Our implementation uses:**
- 1 search query (100 units) + 1 video details query (1 unit) = **101 units per load**
- **~99 loads per day** with current implementation

### Optimization Strategies

**1. Caching (Already Implemented)**
```typescript
staleTime: 1000 * 60 * 30,        // 30 minutes
gcTime: 1000 * 60 * 60 * 24,      // 24 hours
```
- Data cached for 30 minutes (no refetch)
- Kept in memory for 24 hours

**2. Reduce maxResults** (if needed):
```typescript
// In useYouTubeVideos hook
useYouTubeVideos(6)  // Show only 6 videos instead of 9
```

**3. Use Playlist Instead of Search**:
```typescript
// In PastEventsSection.tsx
import { fetchPlaylistVideos } from '@/lib/youtubeApi';

const playlistId = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;
const { data } = useQuery({
  queryKey: ['youtube-playlist'],
  queryFn: () => fetchPlaylistVideos(playlistId, 9),
  // ... same config
});
```
*Note: Playlist queries cost only 1 unit!*

**4. Monitor Usage**:
- Visit: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas
- Set up quota alerts

---

## 🚀 Performance Optimization

### Current Optimizations

✅ **Lazy Loading**
- Videos load only when component mounts
- Images use `loading="lazy"` attribute

✅ **Intersection Observer** (Planned Enhancement)
```typescript
// Future improvement: Load videos only when visible
const [ref, inView] = useIntersectionObserver();

if (inView) {
  // Fetch videos
}
```

✅ **Thumbnail Preview**
- Shows thumbnail before loading player
- Player loads only on user click

✅ **React Query Caching**
- 30-minute stale time
- 24-hour garbage collection
- No refetch on window focus

### Additional Optimizations

**1. Pagination** (Optional):
```typescript
export function PastEventsSection() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  
  const { data: videos } = useYouTubeVideos(itemsPerPage * page);
  
  return (
    <>
      <div className="grid">
        {videos?.slice(0, itemsPerPage * page).map(...)}
      </div>
      {videos && videos.length >= itemsPerPage * page && (
        <Button onClick={() => setPage(p => p + 1)}>Load More</Button>
      )}
    </>
  );
}
```

**2. Image Optimization**:
```typescript
// Use srcset for responsive images
<img
  src={video.thumbnailUrl}
  srcSet={`
    ${video.snippet.thumbnails.default.url} 120w,
    ${video.snippet.thumbnails.medium.url} 320w,
    ${video.snippet.thumbnails.high.url} 480w
  `}
  sizes="(max-width: 768px) 100vw, 33vw"
  loading="lazy"
/>
```

---

## 🔒 Security Best Practices

### ✅ Implemented

1. **Environment Variables**
   - API keys stored in `.env` (git-ignored)
   - Never committed to repository

2. **API Key Restrictions**
   - HTTP referrer restrictions
   - API-specific restrictions
   - Production domain whitelisting

3. **Error Handling**
   - API errors caught and displayed gracefully
   - Retry mechanism with exponential backoff

### 🔐 Additional Security

**1. Rate Limiting** (Optional):
```typescript
// lib/youtubeApi.ts
let lastFetchTime = 0;
const MIN_FETCH_INTERVAL = 5000; // 5 seconds

export async function fetchYouTubeVideos() {
  const now = Date.now();
  if (now - lastFetchTime < MIN_FETCH_INTERVAL) {
    throw new Error('Too many requests');
  }
  lastFetchTime = now;
  // ... rest of implementation
}
```

**2. Content Security Policy**:
```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               connect-src 'self' https://www.googleapis.com https://www.youtube.com;
               frame-src https://www.youtube.com;">
```

---

## 🎨 Customization Guide

### Change Number of Videos

**In PastEventsSection.tsx:**
```typescript
const { data: videos } = useYouTubeVideos(12); // Show 12 videos
```

### Change Grid Layout

```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 4 columns on large screens */}
</div>
```

### Use Specific Playlist

**1. Add to `.env`:**
```env
VITE_YOUTUBE_PLAYLIST_ID=PLxxx...
```

**2. Update component:**
```typescript
import { fetchPlaylistVideos } from '@/lib/youtubeApi';

const { data } = useQuery({
  queryKey: ['youtube-playlist'],
  queryFn: () => fetchPlaylistVideos(
    import.meta.env.VITE_YOUTUBE_PLAYLIST_ID,
    9
  ),
});
```

### Customize Video Player

**In PastEventVideoCard.tsx:**
```typescript
<ReactPlayer
  url={video.videoUrl}
  width="100%"
  height="100%"
  controls
  playing
  light={video.thumbnailUrl}  // Show thumbnail until clicked
  config={{
    youtube: {
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        rel: 0,              // Don't show related videos
        showinfo: 0,         // Hide video info
        iv_load_policy: 3,   // Hide annotations
      }
    }
  }}
/>
```

---

## 🐛 Troubleshooting

### Issue: "API key not configured"

**Solution:**
1. Verify `.env` file exists in project root
2. Check variable names: `VITE_YOUTUBE_API_KEY` (must start with `VITE_`)
3. Restart dev server after adding `.env`

### Issue: "Failed to fetch calendar: 403"

**Causes:**
- Invalid API key
- API key restrictions too strict
- YouTube Data API not enabled
- Quota exceeded

**Solutions:**
1. Check API key restrictions in Google Console
2. Verify API is enabled
3. Check quota usage
4. Regenerate API key if necessary

### Issue: No videos showing

**Debug steps:**
1. Open browser console
2. Check for error messages
3. Verify channel has public videos
4. Test API directly:
```bash
curl "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=YOUR_CHANNEL_ID&key=YOUR_API_KEY&type=video&maxResults=5"
```

### Issue: Videos load slowly

**Solutions:**
1. Reduce `maxResults` parameter
2. Implement pagination
3. Use playlist instead of search
4. Enable more aggressive caching

---

## 📊 Monitoring & Analytics

### Track API Usage

**Google Cloud Console:**
1. Go to "APIs & Services" → "Dashboard"
2. Click "YouTube Data API v3"
3. View quota usage over time

### Set Up Alerts

**1. Create Budget Alert:**
- Go to "Billing" → "Budgets & alerts"
- Set threshold: 8,000 units (80% of quota)
- Add email notification

**2. Monitor in Application:**
```typescript
// Add to youtubeApi.ts
export let apiCallCount = 0;

export async function fetchYouTubeVideos() {
  apiCallCount += 101; // 100 for search + 1 for details
  
  if (apiCallCount > 9000) {
    console.warn('Approaching API quota limit!');
  }
  
  // ... rest of implementation
}
```

---

## 🔄 Migration Guide

### From Static Data to YouTube API

**Before:**
```typescript
const pastEvents = [
  { id: 1, title: "Event 1", image: "...", recapUrl: "#" }
];
```

**After:**
```typescript
const { data: videos } = useYouTubeVideos(9);
```

### Rollback Plan

If you need to revert to static data:

1. **Remove YouTube components**
2. **Restore PastEventsGrid**
3. **Remove API calls**

Or keep both:
```typescript
const { data: videos, error } = useYouTubeVideos(9);

if (error) {
  // Fallback to static data
  return <PastEventsGrid items={staticPastEvents} />;
}

return <PastEventsSection />;
```

---

## 📝 Best Practices Summary

### ✅ DO

- ✅ Use environment variables for API keys
- ✅ Implement API key restrictions
- ✅ Cache API responses
- ✅ Handle errors gracefully
- ✅ Show loading states
- ✅ Use lazy loading
- ✅ Monitor quota usage
- ✅ Provide fallback content

### ❌ DON'T

- ❌ Commit API keys to git
- ❌ Fetch on every render
- ❌ Ignore error states
- ❌ Auto-play videos
- ❌ Exceed quota limits
- ❌ Load all videos at once
- ❌ Skip rate limiting
- ❌ Forget security restrictions

---

## 🚢 Deployment Checklist

### Pre-Deployment

- [ ] Add production domain to API key restrictions
- [ ] Set environment variables on hosting platform
- [ ] Test with production API key
- [ ] Verify quota limits sufficient
- [ ] Enable error monitoring
- [ ] Test error states
- [ ] Verify caching works
- [ ] Check mobile responsiveness

### Platform-Specific Setup

**Vercel:**
```bash
vercel env add VITE_YOUTUBE_API_KEY
vercel env add VITE_YOUTUBE_CHANNEL_ID
```

**Netlify:**
```bash
# Add in Netlify dashboard:
# Settings → Build & Deploy → Environment → Add Variable
```

**Other Platforms:**
- Add variables in platform's environment config
- Ensure they start with `VITE_` prefix

---

## 📚 Additional Resources

### Documentation
- [YouTube Data API v3 Docs](https://developers.google.com/youtube/v3)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [react-player Docs](https://github.com/cookpete/react-player)

### Tools
- [YouTube API Explorer](https://developers.google.com/youtube/v3/docs)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
- [Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost)

### Support
- [Stack Overflow - YouTube API](https://stackoverflow.com/questions/tagged/youtube-api)
- [Google Cloud Support](https://cloud.google.com/support)

---

## 🎉 Next Steps

1. **Get API credentials** from Google Cloud Console
2. **Configure `.env`** file with your credentials
3. **Test locally** to ensure videos load
4. **Customize styling** to match your brand
5. **Deploy to production** with environment variables
6. **Monitor quota usage** in first week
7. **Optimize** based on actual usage patterns

---

**Questions or Issues?**
Check the troubleshooting section or open an issue in the repository.
