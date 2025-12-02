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
        headlineTop: "Innovate . Empower . Grow",
        headlineMain: "Welcome To Nairobi DevOps Community",
        description:
            "We champion collaboration, drive innovation, and share best practices to elevate DevOps across Nairobi and beyond.\n",
        ctaPrimary: {
            text: "Join Our Community",
            link: "/join",
        },
        ctaSecondary: {
            text: "View Our Events",
            link: "events",
            isScroll: true,
        },
    },
    {
        id: 2,
        bgImage:
            "https://ik.imagekit.io/nairobidevops/ndc-assets/PXL_20240601_141651842.jpg?updatedAt=1755152981667",
        headlineTop: "Support. Equip. Represent",
        headlineMain: "Learn DevOps, Your Way",
        description:
            "Access curated courses, mentorship tracks, and hands-on labs — built for learners across Kenya. Whether you're just starting or leveling up, our LMS is here for you.",
        ctaPrimary: {
            text: "Start Learning",
            link: "/learn",

        },
        ctaSecondary: {
            text: "View Our Events",
            link: "/events",
            isScroll: true,
        },
    },
    {
        id: 3,
        bgImage: "https://ik.imagekit.io/nairobidevops/ndc-assets/IMG_9864.jpg",
        headlineTop: "Learn. Build. Thrive",
        headlineMain: "Explore the Nairobi DevOps Shop",
        description:
            "Support the community and rep your mission. Find merch, digital resources, and donation bundles — all designed to fuel DevOps growth in Kenya.",
        ctaPrimary: {
            text: "Visit the Shop",
            link: "/shop",
        },
        ctaSecondary: {
            text: "Support a Cause",
            link: "/donate",
            isScroll: true,
        },
    },
];
