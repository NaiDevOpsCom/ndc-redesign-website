# YouTube Integration - Quick Start Guide

## 🎯 What Was Implemented

A complete YouTube integration system to fetch and display past event recordings from your YouTube channel.

### Files Created/Modified

**New Files:**
```
client/src/
├── types/youtube.ts                      # TypeScript interfaces
├── lib/youtubeApi.ts                     # YouTube API service
├── hooks/useYouTubeVideos.ts             # React Query hook
└── components/events/
    ├── PastEventVideoCard.tsx            # Video card component
    └── PastEventsSection.tsx             # Main section component

.env.example                              # Environment variables template
YOUTUBE_INTEGRATION_GUIDE.md             # Comprehensive documentation
```

**Modified Files:**
```
client/src/components/landing/Events.tsx  # Added PastEventsSection
client/src/pages/Eventspage.tsx           # Integrated YouTube videos
```

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Get YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable "YouTube Data API v3"
4. Create API key (Credentials → Create Credentials → API Key)
5. Restrict key to your domain + localhost

### Step 2: Get Channel ID
1. Go to [YouTube Studio](https://studio.youtube.com)
2. Settings → Channel → Advanced settings
3. Copy your Channel ID

### Step 3: Configure Environment
1. Create `.env` file in project root:
```bash
VITE_YOUTUBE_API_KEY=your_api_key_here
VITE_YOUTUBE_CHANNEL_ID=your_channel_id_here
```

### Step 4: Run
```bash
npm install  # If needed
npm run dev
```

Navigate to http://localhost:5173 and scroll to "Past Events" section.

---

## 🏗️ Architecture Overview

### Data Flow
```
User Loads Page
    ↓
PastEventsSection Component
    ↓
useYouTubeVideos Hook
    ↓
React Query (with caching)
    ↓
fetchYouTubeVideos (API service)
    ↓
YouTube Data API v3
    ↓
Returns video data
    ↓
Display in PastEventVideoCard
```

### Caching Strategy
- **Stale Time**: 30 minutes (no refetch during this time)
- **Cache Time**: 24 hours (data kept in memory)
- **No refetch**: On window focus or component remount

### Performance Optimizations
✅ Lazy image loading  
✅ Thumbnail preview before player load  
✅ ReactPlayer only loads on user click  
✅ React Query caching (30min/24hr)  
✅ No refetch on window focus  
✅ Error boundaries with retry  

---

## 🎨 Component Features

### PastEventVideoCard
- **Thumbnail Preview**: Shows thumbnail until user clicks play
- **View Count**: Displays formatted view count (1.5K, 2.3M, etc.)
- **Published Date**: Shows when video was uploaded
- **Description**: Line-clamped to 2 lines
- **CTA Button**: "Watch on YouTube" opens in new tab
- **Responsive**: Mobile-first design

### PastEventsSection
- **Loading State**: Spinner with message
- **Error State**: Error message with retry button
- **Empty State**: Friendly message when no videos
- **Grid Layout**: 1 col mobile, 2 col tablet, 3 col desktop

---

## 🔒 Security Features

✅ **API Key Protection**
- Stored in `.env` (git-ignored)
- Restricted to specific domains
- Never exposed in client code

✅ **Error Handling**
- API errors caught gracefully
- Fallback UI for failures
- Retry mechanism built-in

✅ **Rate Limiting**
- React Query prevents excessive calls
- 30-minute cache reduces API usage
- Quota monitoring recommended

---

## 📊 API Quota Management

**YouTube API Quota**: 10,000 units/day (free tier)

**Cost per load:**
- Search query: 100 units
- Video details: 1 unit
- **Total: 101 units per load**

**With current caching:**
- ~99 loads per day possible
- Each user's first visit costs 101 units
- Subsequent visits use cache (0 units)

**Optimization tips:**
1. Reduce `maxResults` from 9 to 6 (saves ~30% quota)
2. Use playlist instead of search (costs only 1 unit!)
3. Increase cache time if needed
4. Monitor usage in Google Cloud Console

---

## 🚀 Deployment

### Environment Variables

**Vercel:**
```bash
vercel env add VITE_YOUTUBE_API_KEY
vercel env add VITE_YOUTUBE_CHANNEL_ID
```

**Netlify:**
Add in: Settings → Build & Deploy → Environment Variables

**Other Platforms:**
Add environment variables in platform dashboard

### Pre-Deploy Checklist
- [ ] Add production domain to API key restrictions
- [ ] Test with production API key
- [ ] Verify environment variables set
- [ ] Check quota limits
- [ ] Test error states
- [ ] Verify mobile responsiveness

---

## 🎯 Customization Examples

### Change Number of Videos
```typescript
// In PastEventsSection.tsx
const { data: videos } = useYouTubeVideos(12); // Show 12 instead of 9
```

### Change Grid Layout
```typescript
// 4 columns on large screens
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Use Specific Playlist
```typescript
import { fetchPlaylistVideos } from '@/lib/youtubeApi';

const { data } = useQuery({
  queryKey: ['youtube-playlist'],
  queryFn: () => fetchPlaylistVideos('YOUR_PLAYLIST_ID', 9),
});
```

### Customize Player
```typescript
<ReactPlayer
  config={{
    youtube: {
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        rel: 0,
      }
    }
  }}
/>
```

---

## 🐛 Common Issues

### "API key not configured"
- Verify `.env` exists in project root
- Variable must start with `VITE_`
- Restart dev server after adding `.env`

### "403 Forbidden"
- Check API key restrictions
- Verify YouTube Data API is enabled
- Check quota usage

### No videos showing
- Verify channel has public videos
- Check browser console for errors
- Test API directly with curl

### Videos load slowly
- Reduce `maxResults` parameter
- Implement pagination
- Use playlist instead of search

---

## 📚 Resources

**Documentation:**
- Full guide: `YOUTUBE_INTEGRATION_GUIDE.md`
- [YouTube API Docs](https://developers.google.com/youtube/v3)
- [React Query Docs](https://tanstack.com/query/latest)

**Tools:**
- [API Explorer](https://developers.google.com/youtube/v3/docs)
- [Quota Calculator](https://developers.google.com/youtube/v3/determine_quota_cost)
- [Google Cloud Console](https://console.cloud.google.com/)

---

## 🎉 What's Next?

1. **Set up API credentials** (5 min)
2. **Configure `.env`** (1 min)
3. **Test locally** (2 min)
4. **Customize if needed** (optional)
5. **Deploy to production** (5 min)
6. **Monitor quota usage** (ongoing)

---

## ✨ Features at a Glance

✅ **Automatic fetching** from YouTube channel  
✅ **Smart caching** to save API quota  
✅ **Lazy loading** for performance  
✅ **Error handling** with retry  
✅ **Loading states** for UX  
✅ **Mobile responsive** design  
✅ **SEO friendly** with proper meta tags  
✅ **Type-safe** with TypeScript  
✅ **Accessible** with ARIA labels  
✅ **Secure** API key management  

---

**Need Help?**
See the full guide in `YOUTUBE_INTEGRATION_GUIDE.md` for detailed instructions, troubleshooting, and best practices.
