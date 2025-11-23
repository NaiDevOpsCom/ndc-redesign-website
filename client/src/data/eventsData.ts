// src/data/eventsData.ts

export interface FeaturedEvent {
  image: string;
  type: string;
  date: string;
  title: string;
  description: string;
  buttonText: string;
  badgeColor: string;
}

export interface UpcomingEvent {
  title: string;
  description: string;
  date: string;
  buttonText: string;
}

export const featuredEvents: FeaturedEvent[] = [
  {
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    type: "Workshop",
    date: "Dec 15, 2024",
    title: "API Testing Best Practices & Automation",
    description: "Deep dive into comprehensive API testing strategies, tools, and automation frameworks with hands-on practical sessions.",
    buttonText: "Register Now",
    badgeColor: "bg-primary/10 text-primary",
  },
  {
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    type: "Meetup",
    date: "Dec 22, 2024",
    title: "API & Software Development",
    description: "Monthly networking meetup featuring lightning talks, project showcases, and collaborative discussions about the latest in DevOps trends.",
    buttonText: "Join Meetup",
    badgeColor: "bg-green-500/10 text-green-500",
  },
];

export const upcomingEvents: UpcomingEvent[] = [
  {
    title: "Automation Night",
    description: "Online. Explore CI/CD pipelines and workflow hacks with guest engineers.",
    date: "Thursday, August 1st 2025",
    buttonText: "Join Us",
  },
  {
    title: "Hands-On Workshop: Kubernetes Basics",
    description: "JKUAT Innovation Centre. For beginners and curious minds – bring your laptop and dive in.",
    date: "Saturday, August 10th 2025",
    buttonText: "Sign Up",
  },
  {
    title: "DevOps Social Hour",
    description: "The Alchemist, Westlands. Casual meetup, tech banter, and a chance to grow your network.",
    date: "Friday, August 15th 2025",
    buttonText: "RSVP",
  },
];
