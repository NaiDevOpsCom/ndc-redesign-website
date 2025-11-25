// src/data/communityPageData.ts

export interface CommunityEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

export interface CommunityProject {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const events: CommunityEvent[] = [
  {
    id: 1,
    title: "DevOps Fundamentals Training",
    date: "15 Jan 2024",
    time: "10:00 AM - 12:00 PM",
    location: "Online",
    image: "/images/events/devops-fundamentals.jpg",
  },
  {
    id: 2,
    title: "CI/CD Workshop",
    date: "22 Jan 2024",
    time: "2:00 PM - 4:00 PM",
    location: "Nairobi Tech Hub",
    image: "/images/events/cicd-workshop.jpg",
  },
];

export const projects: CommunityProject[] = [
  {
    id: 1,
    title: "Automated Deployment Pipeline",
    description: "A CI/CD pipeline for automated testing and deployment",
    image: "/images/projects/pipeline.jpg",
  },
  {
    id: 2,
    title: "Infrastructure as Code",
    description: "Terraform templates for cloud infrastructure",
    image: "/images/projects/iac.jpg",
  },
  {
    id: 3,
    title: "Monitoring Dashboard",
    description: "Real-time monitoring for DevOps metrics",
    image: "/images/projects/monitoring.jpg",
  },
];
