export interface GalleryImage {
  url: string;
  alt: string;
  thumbnailUrl?: string;
  priority?: boolean; // For images that should be loaded first
}

export const galleryImages: GalleryImage[] = [
  {
    url: "https://pbs.twimg.com/media/F6xiQyeW8AAgWr1?format=jpg&name=4096x4096",
    thumbnailUrl: "https://pbs.twimg.com/media/F6xiQyeW8AAgWr1?format=jpg&name=small",
    alt: "Community networking event",
    priority: true, // Above fold image
  },
  {
    url: "https://pbs.twimg.com/media/F6xKLnPX0AADDlt?format=jpg&name=4096x4096",
    thumbnailUrl: "https://pbs.twimg.com/media/F6xKLnPX0AADDlt?format=jpg&name=small",
    alt: "Tech conference presentation",
    priority: true, 
  },
  {
    url: "https://pbs.twimg.com/media/F6r8agmXAAAwS48?format=jpg&name=large",
    thumbnailUrl: "https://pbs.twimg.com/media/F6r8agmXAAAwS48?format=jpg&name=small",
    alt: "Software development workspace",
    priority: true, 
  },
  {
    url: "https://pbs.twimg.com/media/F6eSsopWEAARhXy?format=jpg&name=large",
    thumbnailUrl: "https://pbs.twimg.com/media/F6eSsopWEAARhXy?format=jpg&name=small",
    alt: "Community networking event",
    priority: true, 
  },
  {
    url: "https://pbs.twimg.com/media/Ft2scU2XwAMRcx-?format=jpg&name=4096x4096",
    thumbnailUrl: "https://pbs.twimg.com/media/Ft2scU2XwAMRcx-?format=jpg&name=small",
    alt: "Developer community meetup",
  },
  {
    url: "https://pbs.twimg.com/media/GO_ZFMjW4AApaxV?format=jpg&name=large",
    thumbnailUrl: "https://pbs.twimg.com/media/GO_ZFMjW4AApaxV?format=jpg&name=small",
    alt: "Tech conference speakers",
  },
  {
    url: "https://pbs.twimg.com/media/GO-tA-RWcAA0-eR?format=jpg&name=large",
    thumbnailUrl: "https://pbs.twimg.com/media/GO-tA-RWcAA0-eR?format=jpg&name=small",
    alt: "Software development workspace",
  },
  {
    url: "https://pbs.twimg.com/media/GvbPRszXUAAz3ew?format=jpg&name=small",
    thumbnailUrl: "https://pbs.twimg.com/media/GvbPRszXUAAz3ew?format=jpg&name=small",
    alt: "Community networking event",
  },
]; 