export interface HeroSlideData {
  id: number;
  bgImage: string;
  headlineTop: string;
  headlineMain: string;
  description: string;
  ctaPrimary: {
    text: string;
    link: string;
  };
  ctaSecondary: {
    text: string;
    link: string;
    isScroll?: boolean;
  };
}

export const heroSlidesData: HeroSlideData[] = [
  {
    id: 1,
    bgImage: "https://ik.imagekit.io/nairobidevops/ndc-assets/IMG_9872.jpg",
    headlineTop: "Innovate . Empower . Grow.",
    headlineMain: "Welcome To Nairobi DevOps Community",
    description: "Promoting Collaboration, Innovation and best practices within the DevOps industry in Nairobi and beyond.",
    ctaPrimary: {
      text: "Join Our Community",
      link: "/join",
    },
    ctaSecondary: {
      text: "Upcoming Events",
      link: "events",
      isScroll: true,
    },
  },
  {
    id: 2,
    bgImage: "https://ik.imagekit.io/nairobidevops/ndc-assets/PXL_20240601_141651842.jpg?updatedAt=1755152981667",
    headlineTop: "Learn . Share . Connect.",
    headlineMain: "Learn DevOps, Your Way",
    description: "Access curated courses, mentorship tracks, and hands-on labs — built for learners across Kenya. Whether you're just starting or leveling up, our LMS is here for you.",
    ctaPrimary: {
      text: "Start Learning",
      link: "/blog",
    },
    ctaSecondary: {
      text: "View Our Events",
      link: "gallery",
      isScroll: true,
    },
  },
  {
    id: 3,
    bgImage: "https://ik.imagekit.io/nairobidevops/ndc-assets/IMG_9864.jpg",
    headlineTop: "Network . Collaborate . Succeed.",
    headlineMain: "Explore the Nairobi DevOps Shop",
    description: "Support the community and rep your mission. Find merch, digital resources, and donation bundles — all designed to fuel DevOps growth in Kenya.",
    ctaPrimary: {
      text: "Visit the Shop",
      link: "/partners",
    },
    ctaSecondary: {
      text: "Support a Cause",
      link: "community",
      isScroll: true,
    },
  },
];
