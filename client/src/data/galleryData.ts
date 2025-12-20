export interface GalleryImage {
  url: string;
  alt: string;
  priority?: boolean;
}

export const communityGallery: GalleryImage[] = [
  {
    url: "https://ik.imagekit.io/nairobidevops/ndcAssets/IMG_9574.jpg?updatedAt=1764488001154",
    alt: "Community networking event",
    priority: true, // Above fold image
  },
  {
    url: "https://ik.imagekit.io/nairobidevops/ndcAssets/IMG_9580.jpg?updatedAt=1764488001238",
    alt: "Tech conference presentation",
    priority: true,
  },
  {
    url: "https://ik.imagekit.io/nairobidevops/ndcAssets/IMG_9872.jpg?updatedAt=1764488001358",
    alt: "Software development workspace",
    priority: true,
  },
  {
    url: "https://ik.imagekit.io/nairobidevops/ndcAssets/IMG_3858.jpg?updatedAt=1764488001289",
    alt: "Community networking event",
    priority: true,
  },
  {
    url: "https://ik.imagekit.io/nairobidevops/ndcAssets/IMG-20250526-WA0091.jpg?updatedAt=1764488001167",
    alt: "Developer community meetup",
  },
  {
    url: "https://ik.imagekit.io/nairobidevops/ndcAssets/DSC_6977%20copy.jpg?updatedAt=1764488001247",
    alt: "Tech conference speakers",
  },
  {
    url: "https://ik.imagekit.io/nairobidevops/ndcAssets/DSC_6919.jpg?updatedAt=1764488001281",
    alt: "Software development workspace",
  },
  {
    url: "https://ik.imagekit.io/nairobidevops/ndcAssets/PXL_20230701_101030400.MP.jpg?updatedAt=1764488001426",
    alt: "Community networking event",
  },
];

export const teamGallery: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80&auto=format&fit=crop",
    alt: "Team brainstorming session",
  },
  {
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80&auto=format&fit=crop",
    alt: "Team portrait",
  },
  {
    url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80&auto=format&fit=crop",
    alt: "Remote team working",
  },
  {
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80&auto=format&fit=crop",
    alt: "Developers collaborating",
  },
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop",
    alt: "Team meeting",
  },
];
